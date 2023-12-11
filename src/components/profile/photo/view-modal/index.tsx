import styles from "./style.module.css";
import Image from "../../../image";

interface Props {
    src: string
}

export default function ProfilePhotoViewModal({src}: Props) {
    return <div className={styles.container}>
        <a href={src} target="_blank">
            <Image src={src} alt={`Photo of person`}/>
        </a>
    </div>;
}