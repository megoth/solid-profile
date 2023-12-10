import {createContext, ReactElement} from "react";

export interface ModalModel extends ReactElement {
}

const ModalContext = createContext<{
    modal: ModalModel | null;
    setModal: (node: ModalModel) => void;
}>({
    modal: null,
    setModal: () => undefined,
});

export default ModalContext;