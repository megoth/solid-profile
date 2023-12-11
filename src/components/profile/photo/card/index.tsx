import {clsx} from "clsx";
import styles from "../style.module.css";
import React, {useState} from "react";
import ProfilePhotoViewModal from "../view-modal";
import useModal from "../../../../hooks/use-modal";
import CardOptions from "../../../card-options";
import {MdOutlineAddPhotoAlternate} from "react-icons/md";
import UnstyledButton from "../../../unstyled-button";
import {FaPlus} from "react-icons/fa";
import ProfilePhotoEditModal from "../edit-modal";
import Image from "../../../image";
import useProfile from "../../../../hooks/use-profile";
import VerifyModal from "../../../verify-modal";
import {useLdo, useResource} from "@ldo/solid-react";
import Loading from "../../../loading";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import ErrorMessage from "../../../error-message";

interface Props {
    photoUrl?: string
}

export default function PhotoCard({photoUrl}: Props) {
    const photoResource = useResource(photoUrl);
    const {profile, profileResource} = useProfile();
    const {openModal} = useModal();
    const [isSyncing, setIsSyncing] = useState(false);
    const {changeData, commitData, createData} = useLdo();
    const [error, setError] = useState<Error | null>(null);

    if (error) {
        return <ErrorMessage error={error}/>
    }

    if (photoUrl && (!photoResource || photoResource.isLoading())) {
        return <Loading/>
    }

    const handleAddPhoto = () => {
        openModal(<ProfilePhotoEditModal/>)
    }

    const handleDeletePhoto = async () => {
        if (isSyncing || !profile || !profileResource || !photoResource) return;
        setIsSyncing(true);
        await photoResource.delete();
        const oldProfile = profile || createData(SolidProfileShapeType, profile?.["@id"]);
        const updatedProfile = changeData(oldProfile, profileResource);
        updatedProfile.hasPhoto = updatedProfile.hasPhoto.filter((photo) => photo["@id"] !== photoUrl)
        await commitData(updatedProfile).catch(setError);
        setIsSyncing(false);
    }

    const initiatePhotoDelete = () => {
        openModal(<VerifyModal onSubmit={handleDeletePhoto}>
            <p>This will delete the photo from your storage</p>
        </VerifyModal>)
    }

    const handleViewPhoto = (url: string) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        openModal(<ProfilePhotoViewModal src={url}/>);
    }

    return (
        <div className="card">
            <div className="card-image">
                <figure className={clsx("image", styles.image, {[styles.isIcon]: !photoUrl})}>
                    {photoUrl
                        ? (
                            <a href={photoUrl} onClick={handleViewPhoto(photoUrl)}>
                                <Image src={photoUrl}
                                       alt={`Photo of ${profile?.name || profile?.fn || profile?.["@id"]}`}/>
                            </a>
                        )
                        : (
                            <UnstyledButton onClick={handleAddPhoto} className={styles.iconButton}>
                                <MdOutlineAddPhotoAlternate/>
                            </UnstyledButton>
                        )}

                </figure>
            </div>
            {photoUrl
                ? <CardOptions onEdit={console.log} onDelete={initiatePhotoDelete}/>
                : <CardOptions>
                    <UnstyledButton className="card-footer-item" onClick={handleAddPhoto}>
                        <span className="icon is-small"><FaPlus/></span>
                        <span>Add a new photo to your profile</span>
                    </UnstyledButton>
                </CardOptions>}
        </div>
    )
}