import {clsx} from "clsx";
import styles from "./style.module.css";
import {HTMLAttributes, ReactNode} from "react";
import UnstyledButton from "../../../unstyled-button";
import ProfileKnowsModal from "../modal";
import useModal from "../../../../hooks/use-modal";
import useProfile from "../../../../hooks/use-profile";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    webId?: string | null
}

export default function ProfileKnowsCard({children, className, webId, ...props}: Props) {
    const {openModal} = useModal();
    const {canEdit} = useProfile();

    const handleEditContact = () => {
        openModal(<ProfileKnowsModal webId={webId}/>);
    }

    return (
        <div className={clsx("card", className)} {...props}>
            <div className="card-content">
                {children}
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