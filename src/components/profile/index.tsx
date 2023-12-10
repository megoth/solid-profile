import {useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Loading from "../loading";
import Content from "../content";
import LogoutButton from "../logout-button";
import Login from "../login";
import {NavLink, useParams} from "react-router-dom";
import {SolidProfileShapeType} from "../../ldo/profile.shapeTypes";

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
            <h1>Profile of {profile?.name || profile?.fn || webId}</h1>
        </Content>
        {isLoggedIn ? <LogoutButton/> : <Login login={login}/>}
        <div className="field">
            <label className="label">Name</label>
            <div className="control">
                {profile?.name || profile?.fn}
            </div>
        </div>
        <div className="field">
            <label className="label">Photo</label>
            <Content className="control">
                {profile?.hasPhoto?.length! > 0
                    ? <ul>
                        {profile?.hasPhoto.map((photo) => (
                            <li key={`photo-${photo["@id"]}`}>
                                <img src={photo["@id"]} alt={`Photo of ${webId}`}/>
                            </li>
                        ))}
                    </ul>
                    : <div>No photo uploaded</div>}
            </Content>
        </div>
        <div className="field">
            <label className="label">Knows</label>
            <Content className="control">
                {profile?.knows?.length! > 0
                    ? <ul>
                        {profile?.knows?.map((person) => (
                            <li key={`knows-${person["@id"]}`}>
                                <NavLink to={`/${encodeURIComponent(person["@id"])}`}>{person["@id"]}</NavLink>
                            </li>
                        ))}
                    </ul>
                    : <div>Not listed anyone yet</div>}
            </Content>
        </div>
    </>
}