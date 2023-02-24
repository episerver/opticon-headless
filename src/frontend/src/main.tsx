import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App";
import PageComponentSelector, { PageDataLoader } from "./components/PageComponentSelector";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index loader={PageDataLoader} element={<PageComponentSelector />} />
            <Route path="/*" loader={PageDataLoader} element={<PageComponentSelector />} />
        </Route>
    )
);
ReactDOM.createRoot(document.getElementById("root") ?? document.createElement("div")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
