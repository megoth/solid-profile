import {useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Content from "../../components/content";
import Loading from "../../components/loading";
import {NavLink} from "react-router-dom";
import {SolidProfileShapeType} from "../../ldo/profile.shapeTypes.ts";
import FrontpageBody from "./index.mdx";

export default function Frontpage() {
    const {session: {isLoggedIn, webId}} = useSolidAuth();
    const profileResource = useResource(webId);
    const profile = useSubject(SolidProfileShapeType, webId);
    if (webId && profileResource?.isLoading()) {
        return <Loading/>
    }
    return <>
        <Content>
            <FrontpageBody />
            {isLoggedIn && webId && <>
                <p>Hello, {profile?.name || webId}</p>
                <p>Go to <NavLink to={`/${encodeURIComponent(webId)}`}>your profile</NavLink></p>
            </>}
        </Content>
    </>
}