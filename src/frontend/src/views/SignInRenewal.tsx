import React, { useEffect } from "react";
import AuthService from '../AuthService';

const SignInRenewal = () => {
    useEffect(() => {
        AuthService.userManager.signinSilentCallback();
    }, [])

    return (
        <></>
   )
}

export default SignInRenewal;