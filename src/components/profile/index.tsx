import {useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import {SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../loading";
import Content from "../content";
import LogoutButton from "../logout-button";
import Login from "../login";
import {useParams} from "react-router-dom";

export default function Profile() {
    const {webId} = useParams();
    const {session: {isLoggedIn}, login} = useSolidAuth();
    const profileResource = useResource(webId);
    const profile = useSubject(SolidProfileShapeType, webId);
    if (webId && profileResource?.isLoading()) {
        return <Loading/>
    }
    return <>
        <Content>
            <h1>{profile?.name || webId}</h1>
        </Content>
        {isLoggedIn ? <LogoutButton/> : <Login login={login}/>}
    </>
}