import {HTMLAttributes} from "react";
import LoginButtonModal from "./modal";
import {clsx} from "clsx";
import useModal from "../../hooks/use-modal";

export default function LoginButton({className, ...props}: HTMLAttributes<HTMLButtonElement>) {
    const {setModal} = useModal();
    return (
        <button
            className={clsx("button is-small is-primary is-light", className)}
            onClick={() => setModal(<LoginButtonModal/>)} {...props}>
            Log in
        </button>
    )
}