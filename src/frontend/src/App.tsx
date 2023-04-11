import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import ErrorBoundary from "@components/common/ErrorBoundary";
import { defaultConfig } from '@episerver/content-delivery';
import Config from "./config.json";
import AuthService from './AuthService';

const App = () => {
  useEffect(() => {
    defaultConfig.apiUrl = `${Config.CONTENT_DELIVERY_API}/api/episerver/v3.0`;
    defaultConfig.getAccessToken = () => AuthService.getAccessToken();
    defaultConfig.selectAllProperties = true;
    defaultConfig.expandAllProperties = true;
  }, [])

  return (
    <div className="font-nunito text-base text-black dark:text-white dark:bg-slate-900">
      <Navbar />
      <section className="relative md:pt-18 pt-16 bg-gray-50 dark:bg-slate-800">
        <ErrorBoundary>
            <Outlet />
        </ErrorBoundary>
      </section>
      <Footer />
    </div>
)};

export default App;
