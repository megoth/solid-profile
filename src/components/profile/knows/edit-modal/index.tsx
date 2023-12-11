import {useForm} from "react-hook-form";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import {useState} from "react";
import {useLdo} from "@ldo/solid-react";
import useModal from "../../../../hooks/use-modal";
import ErrorMessage from "../../../error-message";
import Loading from "../../../loading";
import useProfile from "../../../../hooks/use-profile";
import {VALID_URL_PATTERN} from "../../../../constants.ts";
import FormControls from "../../../form-controls";
import useNotification from "../../../../hooks/use-notification";

interface Props {
    webId?: string | null
}

interface WebIdFormData {
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
    } = useForm<WebIdFormData>({
        values
    });
    const [error, setError] = useState<Error | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const {notify} = useNotification();

    if (error) {
        return <ErrorMessage error={error}/>
    }

    if (profileResource?.isDoingInitialFetch()) {
        return <Loading/>
    }

    const onSubmit = async (data: WebIdFormData) => {
        if (isSyncing || !profile || !profileResource) return;
        setIsSyncing(true);
        const oldProfile = profile || createData(SolidProfileShapeType, profile?.["@id"]);
        const updatedProfile = changeData(oldProfile, profileResource);
        if (webId) {
            updatedProfile.knows = (updatedProfile.knows || []).map((person: {
                "@id": string
            }) => person["@id"] === webId ? {"@id": data.webId} : person);
        } else {
            updatedProfile.knows = [...updatedProfile.knows?.values() || [], {"@id": data.webId}];
        }
        await commitData(updatedProfile).catch(setError);
        setValues({webId: ""});
        setIsSyncing(false);
        closeModal();
        notify(webId ? <>Updated profile</> : <>Created profile</>)
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
        <FormControls disabled={isSyncing}/>
    </form>
}