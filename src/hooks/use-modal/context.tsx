import {createContext, ReactElement} from "react";

export interface ModalOptions {
    small?: boolean
}

export interface ModalModel extends ReactElement {
}

export type CloseModalFn = () => void;
export type OpenModalFn = (node: ModalModel, options?: ModalOptions) => void;

const ModalContext = createContext<{
    closeModal: CloseModalFn;
    openModal: OpenModalFn;
}>({
    closeModal: () => undefined,
    openModal: () => undefined,
});

export default ModalContext;