import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import {useResource, useSubject} from "@ldo/solid-react";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import Loading from "../../../loading";
import ProfileKnowsCard from "../card";
import ErrorMessage from "../../../error-message";
import styles from "./style.module.css";
import {NavLink} from "react-router-dom";

interface Props extends HTMLAttributes<HTMLDivElement> {
    webId: string
}

export default function ProfileKnowsPerson({className, webId, ...props}: Props) {
    const personResource = useResource(webId);
    const person = useSubject(SolidProfileShapeType, webId);
    const error = personResource?.isError ? new Error("Error loading resource") : null;

    if (error) {
        return <ErrorMessage error={error}/>
    }

    if (personResource?.isDoingInitialFetch()) {
        return <Loading/>
    }

    return (
        <NavLink to={`/${encodeURIComponent(webId)}`}>
            <ProfileKnowsCard className={clsx("card", className)} {...props} webId={webId}>
                <div className="media">
                    <div className="media-left">
                        <figure className={clsx("image", styles.image)}>
                            <img src={person?.hasPhoto?.[0]?.["@id"] || "./solid.svg"} alt="User photo"/>
                        </figure>
                    </div>
                    <div className={clsx("media-content", styles.mediaContent)}>
                        <div className="title is-4">{person.name || "[Name not found]"}</div>
                        <pre className={clsx("subtitle", styles.webId)}>
                            {webId?.replace(/http(s):\/\//, "")}
                    </pre>
                    </div>
                </div>
            </ProfileKnowsCard>
        </NavLink>
    );
}