import {useContext} from "react";
import ModalContext from "../../hooks/use-modal/context.tsx";
import LoginButtonModal from "./modal";

export default function LoginButton() {
    const {setModal} = useContext(ModalContext);
    return <>
        <button className="button is-small" onClick={() => setModal(<LoginButtonModal />)}>
            <span className="icon is-small"><img src="/solid.svg" alt="Solid logo"/></span>
            <span>Log in</span>
        </button>
    </>
}