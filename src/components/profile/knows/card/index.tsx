import {clsx} from "clsx";
import styles from "./style.module.css";
import {HTMLAttributes, ReactNode} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    image: ReactNode
    name: string
    webId?: ReactNode
}

export default function ProfileKnowsCard({className, image, name, webId, ...props}: Props) {
    return (
        <div className={clsx("card", className)} {...props}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className={clsx("image", styles.image)}>
                            {image}
                        </figure>
                    </div>
                    <div className={clsx("media-content", styles.mediaContent)}>
                        <div className="title is-4">{name || "[Name not found]"}</div>
                        <div className={clsx("subtitle is-6", styles.webId)}>
                            {webId}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}