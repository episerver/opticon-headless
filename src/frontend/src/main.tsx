import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App";
import PageComponentSelector, { PageDataLoader } from "@views/PageComponentSelector";
import NotFound from "@views/NotFound";
import SignIn from "@views/SignIn";;
import ResetPassword from "@views/ResetPassword";
import SignInCallback from "@views/SignInCallback";
import SignInRenewal from "@views/SignInRenewal";
import AccessDenied from "@views/AccessDenied";
import SignUp from "@views/SignUp";
import Setting from "@views/Setting";
import CartDetail from "@views/CartDetail";
import CheckOut from "@views/CheckOut";
import "./main.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/signin-callback" element={<SignInCallback />}/>
            <Route path="/signin-renewal" element={<SignInRenewal />}/>
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<App />}>
                <Route index loader={PageDataLoader} element={<PageComponentSelector />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/cart-detail" element={<CartDetail />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/access-denied" element={<AccessDenied />} />
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
