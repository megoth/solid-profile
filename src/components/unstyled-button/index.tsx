import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import styles from "./style.module.css";

export default function UnstyledButton({className, ...props}: HTMLAttributes<HTMLButtonElement>) {
    return <button className={clsx("button", styles.button, className)} type="button" {...props} />
}