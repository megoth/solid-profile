import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import {useResource, useSubject} from "@ldo/solid-react";
import {SolidProfileShapeType} from "../../../../ldo/profile.shapeTypes.ts";
import styles from "./style.module.css";
import {NavLink} from "react-router-dom";
import Loading from "../../../loading";

interface Props extends HTMLAttributes<HTMLDivElement> {
    webId: string
}

export default function ProfileKnowsPerson({children, className, webId, ...props}: Props) {
    const profileResource = useResource(webId);
    const profile = useSubject(SolidProfileShapeType, webId);

    if (profileResource?.isDoingInitialFetch()) {
        return <Loading/>
    }

    return (
        <NavLink to={`/${encodeURIComponent(webId)}`}>
            <div className={clsx("card", className)} {...props}>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className={clsx("image", styles.image)}>
                                <img src={profile?.hasPhoto?.[0]?.["@id"] || "./solid.svg"} alt="User photo"/>
                            </figure>
                        </div>
                        <div className={clsx("media-content", styles.mediaContent)}>
                            <div className="title is-4">{profile.name || "[Name not found]"}</div>
                            <div className={clsx("subtitle is-6", styles.webId)}>
                                {webId.replace(/http(s):\/\//, "")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
}