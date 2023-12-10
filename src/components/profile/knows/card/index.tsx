import {clsx} from "clsx";
import styles from "./style.module.css";
import {HTMLAttributes, ReactNode} from "react";
import UnstyledButton from "../../../unstyled-button";
import ProfileKnowsModal from "../modal";
import useModal from "../../../../hooks/use-modal";
import useProfileForm from "../../../../hooks/use-profile-form";

interface Props extends HTMLAttributes<HTMLDivElement> {
    image: ReactNode
    name: string
    ownProfile?: boolean
    webId?: string | null
    webIdLabel?: ReactNode
}

export default function ProfileKnowsCard({className, image, name, ownProfile, webId, webIdLabel, ...props}: Props) {
    const {openModal} = useModal();
    const {canEdit} = useProfileForm();

    const handleEditContact = () => {
        openModal(<ProfileKnowsModal webId={webId}/>);
    }

    return (
        <div className={clsx("card", className)} {...props}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className={clsx("image", styles.image)}>
                            {image}
                        </figure>
                    </div>
                    <div className={clsx("media-content", styles.mediaContent)}>
                        <div className="title is-4">{name || "[Name not found]"}</div>
                        <pre className={clsx("subtitle", styles.webId)}>
                            {webId?.replace(/http(s):\/\//, "")}
                        </pre>
                    </div>
                </div>
            </div>
            {canEdit && <div className="card-footer">
                <UnstyledButton className={clsx("card-footer-item", styles.cardFooterItem)}
                                onClick={handleEditContact}>
                    Edit
                </UnstyledButton>
                <UnstyledButton className={clsx("card-footer-item", styles.cardFooterItem)}>
                    Delete
                </UnstyledButton>
            </div>}
        </div>
    )
}