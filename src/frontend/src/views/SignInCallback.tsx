import React, { useEffect } from "react";
import AuthService from '../AuthService';

const SignInCallback = () => {
    useEffect(() => {
        AuthService.userManager.signinRedirectCallback().then((user: any) => {
            if (user && user.state) {
              window.location.href = user.state;
            } else {
              window.location.href = window.location.origin;
            }
          }).catch((err: any) => {
            console.error(err);
          });
    }, [])

    return (
        <></>
   )
}

export default SignInCallback;