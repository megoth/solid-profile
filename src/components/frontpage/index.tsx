import {useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Login from "../login";
import Content from "../content";
import Loading from "../loading";
import LogoutButton from "../logout-button";
import {NavLink} from "react-router-dom";
import {SolidProfileShapeType} from "../../ldo/profile.shapeTypes.ts";

export default function Frontpage() {
    const {session: {isLoggedIn, webId}, login} = useSolidAuth();
    const profileResource = useResource(webId);
    const profile = useSubject(SolidProfileShapeType, webId);
    if (webId && profileResource?.isLoading()) {
        return <Loading/>
    }
    return <>
        <Content>
            <h1>Hello Solid World!</h1>
            {webId && <>
                <p>Hello, {profile?.name || webId}</p>
                <p>Go to <NavLink to={`/${encodeURIComponent(webId)}`}>your profile</NavLink></p>
            </>}
        </Content>
        {isLoggedIn ? <LogoutButton /> : <Login login={login}/>}
    </>
}