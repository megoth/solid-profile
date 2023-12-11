import {clsx} from "clsx";
import styles from "./style.module.css";
import {HTMLAttributes, ReactNode, useState} from "react";
import UnstyledButton from "../../../unstyled-button";
import ProfileKnowsModal from "../modal";
import useModal from "../../../../hooks/use-modal";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import VerifyModal from "../../../verify-modal";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import useProfile from "../../../../hooks/use-profile";
import {useLdo} from "@ldo/solid-react";
import ErrorMessage from "../../../error-message";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    canEdit?: boolean
    webId?: string | null
}

export default function ProfileKnowsCard({canEdit, children, className, webId, ...props}: Props) {
    const {profile, profileResource} = useProfile();
    const {commitData, changeData, createData} = useLdo();
    const {closeModal, openModal} = useModal();
    const [isSyncing, setIsSyncing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    if (error) {
        return <ErrorMessage error={error}/>
    }

    const handleDelete = async (): Promise<void> => {
        if (isSyncing || !profile || !profileResource) return;
        setIsSyncing(true);
        const oldProfile = profile || createData(SolidProfileShapeType, profile?.["@id"]);
        const updatedProfile = changeData(oldProfile, profileResource);
        if (!updatedProfile?.knows) return;
        updatedProfile.knows = updatedProfile.knows.filter((person) => person["@id"] !== webId);
        await commitData(updatedProfile).catch(setError);
        setIsSyncing(false);
        closeModal();
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