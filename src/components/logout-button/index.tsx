import {useSolidAuth} from "@ldo/solid-react";
import {HTMLAttributes} from "react";
import {clsx} from "clsx";

export default function LogoutButton({className, ...props}: HTMLAttributes<HTMLButtonElement>) {
    const {logout} = useSolidAuth();
    return (
        <button className={clsx("button is-small", className)} onClick={logout} {...props}>Log out</button>
    )
}