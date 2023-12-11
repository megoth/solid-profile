import UnstyledButton from "../unstyled-button";
import {clsx} from "clsx";
import styles from "./style.module.css";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import useProfile from "../../hooks/use-profile";
import {ReactNode} from "react";

interface Props {
    children?: ReactNode
    onDelete?: () => void
    onEdit?: () => void
}

export default function CardOptions({children, onDelete, onEdit}: Props) {
    const {canEdit} = useProfile();

    return canEdit && <div className={clsx("card-footer", styles.cardFooter)}>
        {onEdit && (
            <UnstyledButton className="card-footer-item" onClick={onEdit}>
                <span className="icon is-small"><FaPencilAlt/></span>
                <span>Edit</span>
            </UnstyledButton>
        )}
        {children}
        {onDelete && (
            <UnstyledButton className="card-footer-item" onClick={onDelete}>
                <span className="icon is-small"><FaTrash/></span>
                <span>Delete</span>
            </UnstyledButton>
        )}
    </div>
}