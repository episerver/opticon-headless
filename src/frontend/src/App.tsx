import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import ErrorBoundary from "@components/layout/ErrorBoundary";
import DisplayMode from "@components/layout/DisplayMode";
import ScrollTop from "@components/layout/ScrollTop";
import CookieConsent from "@components/layout/CookieConsent";

const App = () => {

  return (
    <>
      <Navbar />
      <ErrorBoundary>
      <Outlet />
      </ErrorBoundary>
      <Footer />
      <ScrollTop/>
      <DisplayMode/>
      <CookieConsent/>
    </>
)};

export default App;
