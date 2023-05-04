import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavStickyRoutes } from "../constants/NavStickyRoutes";

const useScroll = (hasError: boolean) => {
    const location = useLocation();
    
    const updateNavBarClass = () => {
      const navbar = document.getElementById("topnav");
      if (navbar != null) {
          if(!NavStickyRoutes.includes(location.pathname)){
              if(hasError){
                  navbar.classList.add("nav-sticky");
              }else{
                  if (
                      document.body.scrollTop >= 50 ||
                      document.documentElement.scrollTop >= 50
                  ) {
                      navbar.classList.add("nav-sticky");
                  } else {
                      navbar.classList.remove("nav-sticky");
                  }
              }
          }else{
              navbar.classList.add("nav-sticky");
          }   
      }
    }

    const addScrollEvent = () => {
        window.addEventListener('scroll', (ev) => {
            ev.preventDefault();
            updateNavBarClass();
        })
    }

    useEffect(() => {
        addScrollEvent();
        updateNavBarClass();
    }, [hasError, location.key])
}

export default useScroll;