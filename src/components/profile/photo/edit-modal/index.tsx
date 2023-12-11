import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useModal from "../../../../hooks/use-modal";
import ErrorMessage from "../../../error-message";
import Loading from "../../../loading";
import useProfile from "../../../../hooks/use-profile";
import {Container, LeafUri} from "@ldo/solid";
import {useLdo, useSolidAuth} from "@ldo/solid-react";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import mime from "mime";

interface PhotoFormData {
    photo: FileList | null
}

export default function ProfilePhotoEditModal() {
    const {session} = useSolidAuth();
    const {profile, profileResource} = useProfile();
    const {closeModal} = useModal();
    const [values, setValues] = useState({
        photo: null
    });
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<PhotoFormData>({
        values
    });
    const [error, setError] = useState<Error | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const {changeData, commitData, createData, getResource} = useLdo();
    const [container, setContainer] = useState<
        Container | undefined
    >();

    useEffect(() => {
        if (!profileResource) return;
        const parentContainer = profileResource.getParentContainer() as Container;
        if (!parentContainer || !parentContainer.uri) return;
        parentContainer.createIfAbsent().then(() => setContainer(parentContainer)).catch(setError);
    }, [getResource, profileResource, session.webId]);

    if (error) {
        return <ErrorMessage error={error}/>
    }

    if (profileResource?.isDoingInitialFetch()) {
        return <Loading/>
    }

    const onSubmit = async (data: PhotoFormData) => {
        if (isSyncing || !profile || !profileResource || !data.photo?.[0]) return;
        setIsSyncing(true);
        const oldProfile = profile || createData(SolidProfileShapeType, profile?.["@id"]);
        const updatedProfile = changeData(oldProfile, profileResource);
        const photoUri = [
            data.photo[0].name.replace(/.(\w+)?$/, ""),
            crypto.randomUUID(),
            mime.getExtension(data.photo[0].type)
        ].join(".");
        const result = await container?.uploadChildAndOverwrite(
            photoUri as LeafUri,
            data.photo[0],
            data.photo[0].type
        );
        if (!result || result.isError) {
            setError(new Error(result?.message))
            return;
        }
        const fullPhotoUri = container?.uri + photoUri;
        updatedProfile.hasPhoto = [...updatedProfile.hasPhoto, {"@id": fullPhotoUri}]
        // updatedProfile.knows = webId
        //     ? (updatedProfile.knows || []).map((person) => person["@id"] === webId
        //         ? {"@id": data.webId}
        //         : person)
        //     : [...updatedProfile.knows?.values() || [], {"@id": data.webId}];
        await commitData(updatedProfile).catch(setError);
        setValues({photo: null});
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