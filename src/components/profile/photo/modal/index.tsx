import styles from "./style.module.css";

interface Props {
    src: string
}

export default function ProfilePhotoModal({src}: Props) {
    return <div className={styles.container}>
        <img src={src} alt={`Photo of person`}/>
    </div>;
}