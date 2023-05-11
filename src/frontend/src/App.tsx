import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "@components/layout/Footer/Footer";
import Navbar from "@components/layout/NavBar/Navbar";
import ErrorBoundary from "@components/layout/ErrorBoundary";
import DisplayMode from "@components/layout/DisplayMode";
import ScrollTop from "@components/layout/ScrollTop";
import CookieConsent from "@components/layout/CookieConsent";
import useError from "./hooks/UseError";
import useScroll from "./hooks/UseScroll";

const App = () => {
    const { hasError, setHasError } = useError();
    useScroll(hasError);

    return (
        <>
            <Navbar />
            <ErrorBoundary hasError={hasError} setHasError={setHasError}>
                <Outlet />
            </ErrorBoundary>
            <Footer />
            <ScrollTop />
            <DisplayMode />
            <CookieConsent />
        </>
    );
};

export default App;
