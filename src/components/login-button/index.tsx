import {HTMLAttributes, useContext} from "react";
import ModalContext from "../../hooks/use-modal/context.tsx";
import LoginButtonModal from "./modal";
import {clsx} from "clsx";

export default function LoginButton({className, ...props}: HTMLAttributes<HTMLButtonElement>) {
    const {setModal} = useContext(ModalContext);
    return (
        <button
            className={clsx("button is-small is-primary is-light", className)}
            onClick={() => setModal(<LoginButtonModal/>)} {...props}>
            Log in
        </button>
    )
}