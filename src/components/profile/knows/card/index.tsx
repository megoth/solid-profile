import {clsx} from "clsx";
import styles from "./style.module.css";
import {HTMLAttributes, ReactNode} from "react";
import UnstyledButton from "../../../unstyled-button";
import ProfileKnowsModal from "../modal";
import useModal from "../../../../hooks/use-modal";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import VerifyModal from "../../../verify-modal";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    canEdit?: boolean
    webId?: string | null
}

export default function ProfileKnowsCard({canEdit, children, className, webId, ...props}: Props) {
    const {openModal} = useModal();

    const handleDelete = async (): Promise<void> => {
        console.log(webId);
        return new Promise((resolve) => resolve());
    }

    const handleDeleteInitiation = () => {
        openModal(<VerifyModal onSubmit={handleDelete}/>, {small: true});
    }

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
                    <span className="icon is-small">
                        <FaPencilAlt/>
                    </span>
                    <span>Edit</span>
                </UnstyledButton>
                <UnstyledButton className={clsx("card-footer-item", styles.cardFooterItem)}
                                onClick={handleDeleteInitiation}>
                    <span className="icon is-small">
                        <FaTrash/>
                    </span>
                    <span>Delete</span>
                </UnstyledButton>
            </div>}
        </div>
    )
}