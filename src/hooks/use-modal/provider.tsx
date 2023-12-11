import {ReactNode, useState} from "react";
import ModalContext, {CloseModalFn, ModalModel, OpenModalFn} from "./context.tsx";
import {clsx} from "clsx";
import styles from "./style.module.css";

interface Props {
    children: ReactNode;
}

export function ModalContextProvider({children}: Props) {
    const [modal, setModal] = useState<ModalModel | null>(null);
    const [small, setSmall] = useState(false);

    const closeModal: CloseModalFn = () => setModal(null);

    const openModal: OpenModalFn = (modal, options) => {
        setModal(modal);
        setSmall(options?.small || false)
    }

    return (
        <ModalContext.Provider value={{closeModal, openModal}}>
            {modal && <div className={clsx("modal is-active", styles.modal)}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className={clsx("modal-content", styles.modalContent, {
                    [styles.modalContentIsSmall]: small
                })}>{modal}</div>
                <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
            </div>}
            {children}
        </ModalContext.Provider>
    )
}