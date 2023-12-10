import React from "react";
import Grid from "../../grid";
import {clsx} from "clsx";
import styles from "./style.module.css";
import useModal from "../../../hooks/use-modal";
import ProfilePhotoModal from "./modal";

interface Props {
    value: Array<{"@id": string}> | undefined
}

export default function ProfilePhoto({value}: Props) {
    const {openModal} = useModal();

    const handleClick = (url: string) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        openModal(<ProfilePhotoModal src={url} />);
    }

    return value && value.length > 0
        ? <Grid>
            {value.map((photo) => (
                <li key={`photo-${photo["@id"]}`}>
                    <div className="card">
                        <div className="card-image">
                            <figure className={clsx("image", styles.image)}>
                                <a href={photo["@id"]} onClick={handleClick(photo["@id"])}>
                                    <img src={photo["@id"]} alt={`Photo of person`}/>
                                </a>
                            </figure>
                        </div>
                    </div>
                </li>
            ))}
        </Grid>
        : <div>No photos listed</div>
}