import { FC, useEffect, useState } from "react";
import ErrorBoundaryInner from "./ErrorBoundaryInner";
import { useLocation } from "react-router-dom";
import React from "react";

const ErrorBoundary: FC<any> = ({children}) => {
    const [hasError, setHasError] = useState(false);
    const location = useLocation();

    useEffect(() => {
      if (hasError) {
        setHasError(false);
      }
    }, [location.key]);

    useEffect(() => {
        const navbar = document.getElementById("topnav");
        if (navbar != null) {
          if(hasError){
            navbar.classList.add("nav-sticky");
          }else{
            navbar.classList.remove("nav-sticky");
          }
        }
    }, [hasError])

    return (
      <ErrorBoundaryInner 
        hasError={hasError} 
        setHasError={setHasError}
      >
        {children}
      </ErrorBoundaryInner>
    );
  }

  export default ErrorBoundary;