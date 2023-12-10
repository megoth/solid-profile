import {useContext} from "react";
import ModalContext from "./context.tsx";

export default function useModal() {
    return useContext(ModalContext);
}

