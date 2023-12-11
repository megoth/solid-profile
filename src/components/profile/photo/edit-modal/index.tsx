import {useForm} from "react-hook-form";
import {useState} from "react";
import useModal from "../../../../hooks/use-modal";
import ErrorMessage from "../../../error-message";
import Loading from "../../../loading";
import useProfile from "../../../../hooks/use-profile";

interface Props {
    photo?: string | null
}

interface PhotoFormData {
    photo: string
}

export default function ProfilePhotoEditModal({photo}: Props) {
    const {profile, profileResource} = useProfile();
    const {closeModal} = useModal();
    const [values, setValues] = useState({
        photo: photo || ""
    });
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<PhotoFormData>({
        values
    });
    const [error] = useState<Error | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);

    if (error) {
        return <ErrorMessage error={error}/>
    }

    if (profileResource?.isDoingInitialFetch()) {
        return <Loading/>
    }

    const onSubmit = async (data: PhotoFormData) => {
        if (isSyncing || !profile || !profileResource) return;
        setIsSyncing(true);
        console.log(data);
        // const oldProfile = profile || createData(SolidProfileShapeType, profile?.["@id"]);
        // const updatedProfile = changeData(oldProfile, profileResource);
        // updatedProfile.knows = webId
        //     ? (updatedProfile.knows || []).map((person) => person["@id"] === webId
        //         ? {"@id": data.webId}
        //         : person)
        //     : [...updatedProfile.knows?.values() || [], {"@id": data.webId}];
        // await commitData(updatedProfile).catch(setError);
        setValues({photo: ""});
        setIsSyncing(false);
        closeModal();
    }

    return <form onSubmit={handleSubmit(onSubmit)} onReset={closeModal} className="box">
        <div className="field">
            <label className="label">Photo</label>
            <div className="control">
                <input className="input" type="file" {...register("photo", {
                    required: true,
                })} placeholder={"Please add photo"}/>
            </div>
            {errors.photo && <p className="help is-danger">Photo is required</p>}
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