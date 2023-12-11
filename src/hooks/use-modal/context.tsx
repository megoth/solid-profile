import {createContext, ReactElement} from "react";

export interface ModalModel extends ReactElement {
}

const ModalContext = createContext<{
    closeModal: () => void;
    openModal: (node: ModalModel) => void;
}>({
    closeModal: () => undefined,
    openModal: () => undefined,
});

export default ModalContext;