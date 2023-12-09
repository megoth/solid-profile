import {useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Login from "../login";
import Content from "../content";
import {SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../loading";

export default function Frontpage() {
    const {session: {isLoggedIn, webId}, login} = useSolidAuth();
    const profileResource = useResource(webId);
    const profile = useSubject(SolidProfileShapeType, webId);
    if (webId && profileResource?.isLoading()) {
        return <Loading/>
    }
    if (!isLoggedIn) {
        return <Login login={login}/>
    }
    return <>
        <Content>
            <h1>Hello Solid World!</h1>
        </Content>
        {webId && <div>Hello, {profile?.name || webId}</div>}
    </>
}