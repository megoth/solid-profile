import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useModal from "../../../../hooks/use-modal";
import ErrorMessage from "../../../error-message";
import Loading from "../../../loading";
import useProfile from "../../../../hooks/use-profile";
import {Container, LeafUri} from "@ldo/solid";
import {useLdo, useResource, useSolidAuth} from "@ldo/solid-react";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import mime from "mime";
import FormControls from "../../../form-controls";

interface Props {
    photoUrl?: string
}

interface PhotoFormData {
    photo: FileList | null
}

export default function ProfilePhotoEditModal({photoUrl}: Props) {
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
    const photoResource = useResource(photoUrl);

    useEffect(() => {
        if (!profileResource) return;
        const parentContainer = profileResource.getParentContainer() as Container;
        if (!parentContainer || !parentContainer.uri) return;
        setContainer(parentContainer)
    }, [getResource, profileResource, session.webId]);

    if (error) {
        return <ErrorMessage error={error}/>
    }

    if (profileResource?.isDoingInitialFetch()) {
        return <Loading/>
    }

    const onSubmit = async (data: PhotoFormData) => {
        if (photoUrl && !data.photo?.[0]) {
            return closeModal();
        }
        if (photoUrl && !photoResource) return;
        if (isSyncing || !profile || !profileResource || !data.photo?.[0] || !container) return;
        setIsSyncing(true);
        const oldProfile = profile || createData(SolidProfileShapeType, profile?.["@id"]);
        const updatedProfile = changeData(oldProfile, profileResource);
        const newPhotoUri = [
            data.photo[0].name.replace(/.(\w+)?$/, ""),
            crypto.randomUUID(),
            mime.getExtension(data.photo[0].type)
        ].join(".");
        const result = await container.uploadChildAndOverwrite(
            newPhotoUri as LeafUri,
            data.photo[0],
            data.photo[0].type
        );
        if (!result || result.isError) {
            return setError(new Error(result?.message))
        }
        const fullPhotoUri = container?.uri + newPhotoUri;
        if (photoUrl && photoResource) {
            await photoResource.delete().catch(setError);
            updatedProfile.hasPhoto = [
                ...updatedProfile.hasPhoto.filter((photo) => photo["@id"] !== photoUrl),
                {"@id": fullPhotoUri}
            ];
        } else {
            updatedProfile.hasPhoto = [...updatedProfile.hasPhoto, {"@id": fullPhotoUri}]
        }
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
                    required: !photoUrl,
                })} placeholder={photoUrl ? "Will replace image if given" : "Please add photo"}/>
            </div>
            {photoUrl && <p className="help is-danger">Existing photo will be replaced</p>}
            {errors.photo && <p className="help is-danger">Photo is required</p>}
        </div>
        <FormControls disabled={isSyncing}/>
    </form>
}