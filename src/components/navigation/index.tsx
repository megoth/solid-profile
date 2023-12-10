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
                    <NavLink to={`/${encodeURIComponent(webId)}`} className={clsx("navbar-item", styles.nameSmall)}>
                        {profile?.name}
                    </NavLink>
                    <span className={clsx("navbar-item", styles.nameBig)}>
                        You're logged in as <NavLink to={`/${encodeURIComponent(webId)}`}>{profile?.name}</NavLink>
                    </span>
                </div>}
                <div className="navbar-end">
                    <span className="navbar-item">
                        {isLoggedIn ? <LogoutButton/> : <LoginButton/>}
                    </span>
                </div>
            </div>
        </nav>
    )
}