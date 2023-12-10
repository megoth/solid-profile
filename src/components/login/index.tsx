import {PROVIDERS} from "../../constants";
import styles from "./style.module.css"
import {clsx} from "clsx";
import {HTMLAttributes} from "react";
import {LoginOptions} from "@ldo/solid-react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    login: (issuer: string, loginOptions?: LoginOptions) => Promise<void>,
}

export default function Login({className, login, ...props}: Props) {
    const onCustomProviderClick = async () => {
        const providerUrl = prompt("Please provide Solid Provider URL");
        if (!providerUrl || !(new URL(providerUrl).href)) return;
        await login(providerUrl);
    };

    return (
        <div className={styles.login}>
            {PROVIDERS.map((provider) => (
                <button key={provider.loginIri} type="button"
                        {...props}
                        className={clsx("button", className || "is-info")}
                        onClick={() => login(provider.loginIri)}>
                    {provider.label}
                </button>
            ))}
            <button type="button"
                    {...props}
                    className={clsx("button", className || "is-info")}
                    onClick={onCustomProviderClick}>
                Custom Solid Provider
            </button>
        </div>
    );
}