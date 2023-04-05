import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import ErrorBoundary from "@components/common/ErrorBoundary";

const App = () => {
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
