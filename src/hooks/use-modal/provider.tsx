import {ReactNode, useState} from "react";
import ModalContext, {ModalModel} from "./context.tsx";
import {clsx} from "clsx";
import styles from "./style.module.css";

interface Props {
    children: ReactNode;
}

export function ModalContextProvider({children}: Props) {
    const [modal, setModal] = useState<ModalModel | null>(null);

    const close = () => setModal(null);

    return (
        <ModalContext.Provider value={{modal, setModal}}>
            {modal && <div className={clsx("modal is-active", styles.modal)}>
                <div className="modal-background" onClick={close}></div>
                <div className={clsx("modal-content", styles.modalContent)}>
                    {modal}
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={close}></button>
            </div>}
            {children}
        </ModalContext.Provider>
    )
}