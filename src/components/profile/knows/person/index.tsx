import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import {useResource, useSubject} from "@ldo/solid-react";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import {NavLink} from "react-router-dom";
import Loading from "../../../loading";
import ProfileKnowsCard from "../card";
import ErrorMessage from "../../../error-message";

interface Props extends HTMLAttributes<HTMLDivElement> {
    ownProfile: boolean
    webId: string
}

export default function ProfileKnowsPerson({children, className, ownProfile, webId, ...props}: Props) {
    const profileResource = useResource(webId);
    const profile = useSubject(SolidProfileShapeType, webId);
    const error = profileResource?.isError ? new Error("Error loading resource") : null;

    if (error) {
        return <ErrorMessage error={error}/>
    }

    if (profileResource?.isDoingInitialFetch()) {
        return <Loading/>
    }

    return (
        <NavLink to={`/${encodeURIComponent(webId)}`}>
            {profile.type
                ? <ProfileKnowsCard image={<img src={profile?.hasPhoto?.[0]?.["@id"] || "./solid.svg"}
                                                alt="User photo"/>}
                                    name={profile.name || "[Name not found]"}
                                    ownProfile={ownProfile}
                                    className={clsx("card", className)} {...props}
                                    webId={webId}/>
                : <ProfileKnowsCard image={<img src={"./solid.svg"} alt="User photo"/>}
                                    name={"[Name not found]"}
                                    ownProfile={ownProfile}
                                    className={clsx("card", className)} {...props}
                                    webId={webId}/>
            }
        </NavLink>
    );
}