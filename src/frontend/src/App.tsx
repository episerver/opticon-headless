import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import ErrorBoundary from "@components/layout/ErrorBoundary";
import AuthService from './AuthService';
import Mode from "@components/layout/DisplayMode";
import ScrollTop from "@components/layout/ScrollTop";
import CookieConsent from "@components/layout/CookieConsent";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean>(false);
  
  const checkAuth = () => {
    AuthService.getUser().then((user: any) => {
      if (!user || user.expired) {
        navigate("/signin");
      } else {
        setAuthorized(true);
      }
    });
  }

  useEffect(() => {
    checkAuth();
  }, [location.key]);

  return (
    <>
      <Navbar />
      <ErrorBoundary>
          {authorized && <Outlet />}
      </ErrorBoundary>
      <Footer />
      <ScrollTop/>
      <Mode/>
      <CookieConsent/>
    </>
)};

export default App;
