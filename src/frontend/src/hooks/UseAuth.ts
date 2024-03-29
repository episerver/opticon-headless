import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthService from "../AuthService";

const useAuth = () => {
    const location = useLocation();
    const [authorized, setAuthorized] = useState<boolean>(false);
  
    const checkAuth = () => {
      AuthService.getUser().then((user: any) => {
        if (!user || user.expired) {
          AuthService.signIn();
        } else {
          setAuthorized(true);
        }
      });
    }
  
    useEffect(() => {
      checkAuth();
    }, [location.key]);

    return {
        authorized
    }
}

export default useAuth;