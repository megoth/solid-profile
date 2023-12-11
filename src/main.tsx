import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/layout";
import {BrowserSolidLdoProvider} from '@ldo/solid-react';
import "bulma/css/bulma.min.css"
import {ModalContextProvider} from "./hooks/use-modal/provider.tsx";
import Frontpage from "./pages/frontpage";
import ProfilePage from "./pages/profile";
import ProfileContextProvider from "./hooks/use-profile/provider.tsx";
import {NotificationContextProvider} from "./hooks/use-notification/provider.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProfileContextProvider>
            <ModalContextProvider>
                <Layout/>
            </ModalContextProvider>
        </ProfileContextProvider>,
        children: [
            {
                path: "/:webId",
                element: <ProfilePage/>,
            },
            {
                index: true,
                element: <Frontpage/>,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserSolidLdoProvider>
            <NotificationContextProvider>
                <RouterProvider router={router}/>
            </NotificationContextProvider>
        </BrowserSolidLdoProvider>
    </React.StrictMode>,
)
