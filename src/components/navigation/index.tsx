import {NavLink} from "react-router-dom";
import {clsx} from "clsx";
import styles from "./style.module.css";
import {RiHome6Line} from "react-icons/ri";
import {useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import {SolidProfileShapeType} from "../../ldo/profile.shapeTypes.ts";
import LoginButton from "../login-button";
import LogoutButton from "../logout-button";

export default function Navigation() {
    const {session: {isLoggedIn, webId}} = useSolidAuth();
    const profileResource = useResource(webId);
    const profile = useSubject(SolidProfileShapeType, webId);
    return (
        <nav className={clsx("navbar", styles.navbar)}>
            <div className="container">
                <div className="navbar-brand">
                    <NavLink to={"/"} className={clsx("navbar-item", styles.homeLink)}>
                        <RiHome6Line/>
                        <span>Home</span>
                    </NavLink>
                </div>
                {isLoggedIn && webId && !profileResource?.isLoading() && <div className="navbar-start">
                    <span className="navbar-item">
                        <span className={styles.nameBig}>You're logged in as {profile?.name}</span>
                        <span className={styles.nameSmall}>{profile?.name}</span>
                    </span>
                </div>}
                <div className="navbar-end">
                    <span className="navbar-item">
                        {isLoggedIn ? <LogoutButton /> : <LoginButton/>}
                    </span>
                </div>
            </div>
        </nav>
    )
}