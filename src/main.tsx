import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Frontpage from "./components/frontpage";
import Layout from "./components/layout";
import {BrowserSolidLdoProvider} from '@ldo/solid-react';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
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
            <RouterProvider router={router}/>
        </BrowserSolidLdoProvider>
    </React.StrictMode>,
)
