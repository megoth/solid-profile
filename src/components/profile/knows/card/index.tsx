import {clsx} from "clsx";
import {HTMLAttributes, ReactNode, useState} from "react";
import ProfileKnowsEditModal from "../edit-modal";
import useModal from "../../../../hooks/use-modal";
import VerifyModal from "../../../verify-modal";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import useProfile from "../../../../hooks/use-profile";
import {useLdo} from "@ldo/solid-react";
import ErrorMessage from "../../../error-message";
import CardOptions from "../../../card-options";
import useNotification from "../../../../hooks/use-notification";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    webId?: string | null
}

export default function ProfileKnowsCard({children, className, webId, ...props}: Props) {
    const {profile, profileResource} = useProfile();
    const {commitData, changeData, createData} = useLdo();
    const {closeModal, openModal} = useModal();
    const [isSyncing, setIsSyncing] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const {notify} = useNotification();

    if (error) {
        return <ErrorMessage error={error}/>
    }

    const handleDeleteContact = async (): Promise<void> => {
        if (isSyncing || !profile || !profileResource) return;
        setIsSyncing(true);
        const oldProfile = profile || createData(SolidProfileShapeType, profile?.["@id"]);
        const updatedProfile = changeData(oldProfile, profileResource);
        if (!updatedProfile?.knows) return;
        updatedProfile.knows = updatedProfile.knows.filter((person: {
            "@id": string
        }) => person["@id"] !== webId);
        await commitData(updatedProfile).catch(setError);
        setIsSyncing(false);
        closeModal();
        notify("Contact removed");
    }

    const handleDeleteInitiation = () => {
        openModal(<VerifyModal onSubmit={handleDeleteContact}>
            This will remove the contact from your profile.
        </VerifyModal>, {small: true});
    }

    const handleEditContact = () => {
        openModal(<ProfileKnowsEditModal webId={webId}/>);
    }

    return (
        <div className={clsx("card", className)} {...props}>
            <div className="card-content">
                {children}
            </div>
            {webId && <CardOptions onEdit={handleEditContact} onDelete={handleDeleteInitiation}/>}
        </div>
    )
}