import {useForm} from "react-hook-form";
import {ReactNode, useState} from "react";
import useProfile from "../../hooks/use-profile";
import useModal from "../../hooks/use-modal";
import ErrorMessage from "../error-message";
import Content from "../content";
import FormControls from "../form-controls";

interface Props {
    children?: ReactNode
    onSubmit: () => Promise<void>
}

export default function VerifyModal({children, onSubmit}: Props) {
    const {profile, profileResource} = useProfile();
    const {closeModal} = useModal();
    const {handleSubmit} = useForm();
    const [error, setError] = useState<Error | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);

    if (error) {
        return <ErrorMessage error={error}/>
    }

    const intermediarySubmit = async () => {
        if (isSyncing || !profile || !profileResource) return;
        setIsSyncing(true);
        await onSubmit().catch(setError);
        setIsSyncing(false);
        closeModal();
    }

    return <form onSubmit={handleSubmit(intermediarySubmit)} onReset={closeModal} className="box">
        <Content>
            <h2 className="subtitle">Are you sure?</h2>
            {children}
        </Content>
        <FormControls disabled={isSyncing} />
    </form>
}