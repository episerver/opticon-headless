import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App";
import PageComponentSelector, { PageDataLoader } from "@views/PageComponentSelector";
import NotFound from "@components/common/NotFound";
import SignIn from "@views/SignIn";
import SignUp from "@views/SignUp";
import ResetPassword from "@views/ResetPassword";
import "./main.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/" element={<App />}>
                <Route index loader={PageDataLoader} element={<PageComponentSelector />} />
                <Route path="/error" element={<NotFound />} />
                <Route path="/*" loader={PageDataLoader} element={<PageComponentSelector />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root") ?? document.createElement("div")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
