import {createContext, ReactElement} from "react";

export interface ModalModel extends ReactElement {
}

const ModalContext = createContext<{
    close: () => void;
    openModal: (node: ModalModel) => void;
}>({
    close: () => undefined,
    openModal: () => undefined,
});

export default ModalContext;