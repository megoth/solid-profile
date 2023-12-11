import {useEffect, useState} from "react";
import {clsx} from "clsx";
import useNotification from "../../hooks/use-notification";
import {NotificationModel} from "../../hooks/use-notification/context.tsx";
import styles from "./style.module.css";

interface Props {
    index: number;
    notification: NotificationModel;
}

export default function Notification({index, notification}: Props) {
    const [hidden, setHidden] = useState(notification.hidden);
    const {hide} = useNotification();

    useEffect(() => {
        setTimeout(() => {
            setHidden(true);
            hide(notification.id);
        }, 2000);
    }, [hide, notification.id]);

    return (
        <div className={clsx("notification is-success is-light", styles.notification, {"is-hidden": hidden})}
             key={`notification-${index}`}>
            {notification.message}
        </div>
    )
}