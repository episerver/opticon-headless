import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import ErrorBoundary from "@components/common/ErrorBoundary";
import { defaultConfig } from '@episerver/content-delivery';
import Config from "./config.json";
import AuthService from './AuthService';
import Mode from "@components/common/Mode";
import ScrollTop from "@components/common/ScrollTop";
import CookieConsent from "@components/common/CookieConsent";

const App = () => {
  useEffect(() => {
    defaultConfig.apiUrl = `${Config.CONTENT_DELIVERY_API}/api/episerver/v3.0`;
    defaultConfig.getAccessToken = () => AuthService.getAccessToken();
    defaultConfig.selectAllProperties = true;
    defaultConfig.expandAllProperties = true;
  }, [])

  return (
    <>
      <Navbar />
      <ErrorBoundary>
          <Outlet />
      </ErrorBoundary>
      <Footer />
      <ScrollTop/>
      <Mode/>
      <CookieConsent/>
    </>
)};

export default App;
