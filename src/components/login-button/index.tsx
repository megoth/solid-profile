import {HTMLAttributes} from "react";
import LoginButtonModal from "./modal";
import {clsx} from "clsx";
import useModal from "../../hooks/use-modal";

export default function LoginButton({className, ...props}: HTMLAttributes<HTMLButtonElement>) {
    const {openModal} = useModal();
    return (
        <button
            className={clsx("button is-small is-primary is-light", className)}
            onClick={() => openModal(<LoginButtonModal/>)}
            {...props}>
            Log in
        </button>
    )
}