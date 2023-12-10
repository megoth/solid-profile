import {useLdo, useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Loading from "../loading";
import {NavLink, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {SolidProfileShapeType} from "../../ldo/profile.shapeTypes";
import styles from "./style.module.css";
import {clsx} from "clsx";
import ProfileTextField from "./text-field";
import {useForm} from "react-hook-form";
import {PROFILE_FORM_DATA} from "../../constants";
import {useEffect, useState} from "react";
import ErrorMessage from "../error-message";
import ProfilePhoto from "./photo";
import ProfileKnows from "./knows";

export default function Profile() {
    const {webId} = useParams();
    const [searchParams] = useSearchParams();
    const {session} = useSolidAuth();
    const {commitData, changeData, createData} = useLdo();
    const profileResource = useResource(webId);
    const profile = useSubject(SolidProfileShapeType, webId);
    const [values, setValues] = useState({
        name: ""
    });
    const {
        register,
        handleSubmit,
        formState: {errors, isDirty}
    } = useForm<PROFILE_FORM_DATA>({
        values
    });
    const [error, setError] = useState<Error | null>(null);
    const ownProfile = webId === session.webId;
    const compoundedError = error || (profileResource?.isError ? new Error("Error loading resource") : null);
    const [isSyncing, setIsSyncing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!profile) return;
        setValues({
            name: profile.name || profile.fn || ""
        })
    }, [profile]);

    if (compoundedError) {
        return <ErrorMessage error={compoundedError} />
    }

    if (webId && profileResource?.isLoading()) {
        return <Loading/>
    }

    const onSubmit = async (data: PROFILE_FORM_DATA) => {
        if (isSyncing || !webId || !profileResource) return;
        setIsSyncing(true);
        const oldProfile = profile || createData(SolidProfileShapeType, webId);
        const updatedProfile = changeData(oldProfile, profileResource);
        updatedProfile.name = data.name;
        await commitData(updatedProfile).catch(setError);
        setValues(data);
        setIsSyncing(false);
        navigate(`/${encodeURIComponent(webId)}`);
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        {webId && session.isLoggedIn && ownProfile && (
            searchParams.has("edit")
                ? <div className={clsx("message", {
                    "is-info": !isDirty,
                    "is-primary": isDirty
                })}>
                    <div className={clsx("message-body", styles.messageBody)}>
                        <span>Submit when you're done.</span>
                        <button className={clsx("button is-primary")} type="submit" disabled={isSyncing}>
                            Submit changes
                        </button>
                    </div>
                </div>
                : <div className="message is-info">
                    <div className={clsx("message-body", styles.messageBody)}>
                        <span>This is your profile.</span>
                        <NavLink to={`/${encodeURIComponent(webId)}?edit`}
                                 className="button is-info">Edit</NavLink>
                    </div>
                </div>
        )}
        <div className="field">
            <label className="label">Name</label>
            <div className="control">
                <ProfileTextField name="name" required={true} register={register} value={profile?.name || profile?.fn}/>
            </div>
            {errors.name && <p className="help is-danger">Name is required</p>}
        </div>
        <div className="field">
            <label className="label">Photo</label>
            <div className="control">
                <ProfilePhoto value={profile?.hasPhoto} />
            </div>
        </div>
        <div className="field">
            <label className="label">Knows</label>
            <div className="control">
                <ProfileKnows value={profile?.knows} />
            </div>
        </div>
    </form>
}