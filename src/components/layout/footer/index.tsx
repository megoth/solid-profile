import {HTMLAttributes} from "react";
import styles from "./style.module.css";
import {clsx} from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Footer({className, ...props}: Props) {
    return (
        <footer className={clsx(className, styles.footer)} {...props}>
            <nav className={styles.footerMeta}>
                <div className={styles.footerItem}>
                    <a href="https://github.com/megoth/solid-profile">GitHub repo</a>
                </div>
                <div className={styles.footerItem}>
                    <a href="https://icanhasweb.net">Coded by Arne Hassel</a>
                </div>
            </nav>
        </footer>
    )
}