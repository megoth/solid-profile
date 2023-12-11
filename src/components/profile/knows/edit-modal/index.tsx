import {useForm} from "react-hook-form";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import {useState} from "react";
import {useLdo} from "@ldo/solid-react";
import useModal from "../../../../hooks/use-modal";
import ErrorMessage from "../../../error-message";
import Loading from "../../../loading";
import useProfile from "../../../../hooks/use-profile";
import {VALID_URL_PATTERN} from "../../../../constants.ts";

interface Props {
    webId?: string | null
}

interface AddWebIdFormData {
    webId: string
}

export default function ProfileKnowsEditModal({webId}: Props) {
    const {profile, profileResource} = useProfile();
    const {closeModal} = useModal();
    const {commitData, changeData, createData} = useLdo();
    const [values, setValues] = useState({
        webId: webId || ""
    });
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<AddWebIdFormData>({
        values
    });
    const [error, setError] = useState<Error | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);

    if (error) {
        return <ErrorMessage error={error}/>
    }

    if (profileResource?.isDoingInitialFetch()) {
        return <Loading/>
    }

    const onSubmit = async (data: AddWebIdFormData) => {
        if (isSyncing || !profile || !profileResource) return;
        setIsSyncing(true);
        const oldProfile = profile || createData(SolidProfileShapeType, profile?.["@id"]);
        const updatedProfile = changeData(oldProfile, profileResource);
        updatedProfile.knows = webId
            ? (updatedProfile.knows || []).map((person) => person["@id"] === webId
                ? {"@id": data.webId}
                : person)
            : [...updatedProfile.knows?.values() || [], {"@id": data.webId}];
        await commitData(updatedProfile).catch(setError);
        setValues({webId: ""});
        setIsSyncing(false);
        closeModal();
    }

    return <form onSubmit={handleSubmit(onSubmit)} onReset={closeModal} className="box">
        <div className="field">
            <label className="label">WebID</label>
            <div className="control">
                <input className="input" type={"url"} {...register("webId", {
                    required: true,
                    pattern: VALID_URL_PATTERN
                })} placeholder={"Please add valid URL"}/>
            </div>
            {errors.webId && <p className="help is-danger">WebID is required</p>}
        </div>
        <div className="field is-grouped">
            <div className="control">
                <button className="button is-primary" type="submit">Submit</button>
            </div>
            <div className="control">
                <button className="button is-secondary" type="reset">Cancel</button>
            </div>
        </div>
    </form>
}