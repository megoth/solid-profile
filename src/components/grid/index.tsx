import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import styles from "./styles.module.css";

export default function Grid({className, ...props}: HTMLAttributes<HTMLUListElement>) {
    return (
        <ul className={clsx(styles.grid, className)} {...props} />
    );
}