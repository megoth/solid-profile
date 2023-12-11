import {useLdo, useSolidAuth} from "@ldo/solid-react";
import Loading from "../loading";
import {NavLink} from "react-router-dom";
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
import useProfile from "../../hooks/use-profile";

export default function Profile() {
    const {session} = useSolidAuth();
    const {
        canEdit,
        isLoading,
        isOwner,
        profile,
        profileResource,
        tryingToEdit
    } = useProfile();
    const {commitData, changeData, createData} = useLdo();
    const [values, setValues] = useState({
        name: ""
    });
    const {
        register,
        handleSubmit,
        formState: {errors, isDirty}
    } = useForm<PROFILE_FORM_DATA>({
        values,
    });
    const [error, setError] = useState<Error | null>(null);
    const compoundedError = error || (profileResource?.isError ? new Error("Error loading resource") : null);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        if (!profile) return;
        setValues({
            name: profile.name || profile.fn || ""
        })
    }, [profile]);

    if (compoundedError) {
        return <ErrorMessage error={compoundedError}/>
    }

    if (!profile || isLoading) {
        return <Loading/>
    }

    const onSubmit = async (data: PROFILE_FORM_DATA) => {
        if (isSyncing || !profile["@id"] || !profileResource) return;
        setIsSyncing(true);
        const oldProfile = profile || createData(SolidProfileShapeType, profile["@id"]);
        const updatedProfile = changeData(oldProfile, profileResource);
        updatedProfile.name = data.name;
        await commitData(updatedProfile).catch(setError);
        setValues(data);
        setIsSyncing(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {!session.isLoggedIn && tryingToEdit && <div className="message is-danger">
                <div className="message-body">
                    You're not able to save any changes since you're not authenticated.
                </div>
            </div>}
            {profile["@id"] && session.isLoggedIn && canEdit && (
                <div className={clsx("message", {"is-text": !isDirty, "is-primary": isDirty})}>
                    <div className={clsx("message-body", styles.messageBody)}>
                        <span>The form automatically saves your progress when you leave a field.</span>
                        <NavLink to={`/${encodeURIComponent(profile["@id"])}`} className={clsx("button is-primary")}>
                            Exit edit mode
                        </NavLink>
                    </div>
                </div>
            )}
            {profile["@id"] && session.isLoggedIn && isOwner && !tryingToEdit && (
                <div className="message is-info">
                    <div className={clsx("message-body", styles.messageBody)}>
                        <span>This is your profile.</span>
                        <NavLink to={`/${encodeURIComponent(profile["@id"])}?edit`}
                                 className="button is-info">Edit</NavLink>
                    </div>
                </div>
            )}
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <ProfileTextField name="name" required={true} register={register}
                                      value={profile?.name || profile?.fn}/>
                </div>
                {errors.name && <p className="help is-danger">Name is required</p>}
            </div>
            <div className="field">
                <label className="label">Photo</label>
                <div className="control">
                    <ProfilePhoto value={profile?.hasPhoto}/>
                </div>
            </div>
            <div className="field">
                <label className="label">Knows</label>
                <div className="control">
                    <ProfileKnows value={profile?.knows}/>
                </div>
            </div>
        </form>
    )
}