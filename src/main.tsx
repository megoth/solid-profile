import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Frontpage from "./components/frontpage";
import Layout from "./components/layout";
import {BrowserSolidLdoProvider} from '@ldo/solid-react';
import "bulma/css/bulma.min.css"
import Profile from "./components/profile";
import {ModalContextProvider} from "./hooks/use-modal/provider.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/:webId",
                element: <Profile/>,
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
            <ModalContextProvider>
                <RouterProvider router={router}/>
            </ModalContextProvider>
        </BrowserSolidLdoProvider>
    </React.StrictMode>,
)
