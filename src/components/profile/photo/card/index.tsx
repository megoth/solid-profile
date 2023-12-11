import {clsx} from "clsx";
import styles from "../style.module.css";
import React from "react";
import ProfilePhotoViewModal from "../view-modal";
import useModal from "../../../../hooks/use-modal";
import CardOptions from "../../../card-options";
import {MdOutlineAddPhotoAlternate} from "react-icons/md";
import UnstyledButton from "../../../unstyled-button";
import {FaPlus} from "react-icons/fa";
import ProfilePhotoEditModal from "../edit-modal";
import Image from "../../../image";
import useProfile from "../../../../hooks/use-profile";

interface Props {
    photo?: { "@id": string }
}

export default function PhotoCard({photo}: Props) {
    const {profile} = useProfile()
    const {openModal} = useModal();

    const handleAddPhoto = () => {
        openModal(<ProfilePhotoEditModal/>)
    }

    const handleSelect = (url: string) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        openModal(<ProfilePhotoViewModal src={url}/>);
    }

    return (
        <div className="card">
            <div className="card-image">
                <figure className={clsx("image", styles.image, {[styles.isIcon]: !photo})}>
                    {photo
                        ? (
                            <a href={photo["@id"]} onClick={handleSelect(photo["@id"])}>
                                <Image src={photo["@id"]}
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
            {photo
                ? <CardOptions onEdit={console.log} onDelete={console.log}/>
                : <CardOptions>
                    <UnstyledButton className="card-footer-item" onClick={handleAddPhoto}>
                        <span className="icon is-small"><FaPlus/></span>
                        <span>Add a new photo to your profile</span>
                    </UnstyledButton>
                </CardOptions>}
        </div>
    )
}