import React from "react";
import { useEffect, useState } from "react";
import AuthService from "../../AuthService";
import authService from "../../AuthService";
import Loading from "@components/layout/Loading";

const RequireAuth = (props: any) => {
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const checkAuth = () => {
        AuthService.getUser().then((user: any) => {
            if (!user || user.expired) {
                AuthService.signIn();
            } else {
                setAuthorized(true);
            }
            setLoading(false);
        });
    };

    useEffect(() => {
        checkAuth();
    }, []);

    if (authorized) {
        return <>{props.children}</>;
    } else {
        if (!loading) {
            authService.signIn();
            return <></>;
        } else {
            return <Loading />;
        }
    }
};

export default RequireAuth;
