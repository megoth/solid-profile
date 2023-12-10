import {Outlet, ScrollRestoration} from "react-router-dom";
import styles from "./style.module.css";
import Footer from "./footer";
import Navigation from "../navigation";

export default function Layout() {

    return (
        <div className="container">
            <Navigation/>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <Footer className={styles.footer}/>
            <ScrollRestoration/>
        </div>
    )
}