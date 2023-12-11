import {clsx} from "clsx";
import styles from "./style.module.css";
import {HTMLAttributes, ReactNode} from "react";
import UnstyledButton from "../../../unstyled-button";
import ProfileKnowsForm from "../form";
import useModal from "../../../../hooks/use-modal";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    canEdit?: boolean
    webId?: string | null
}

export default function ProfileKnowsCard({canEdit, children, className, webId, ...props}: Props) {
    const {openModal} = useModal();

    const handleEditContact = () => {
        openModal(<ProfileKnowsForm webId={webId}/>);
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