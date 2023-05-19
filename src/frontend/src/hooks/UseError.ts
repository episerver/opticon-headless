import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useError = () => {
    const location = useLocation();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (hasError) {
            setHasError(false);
        }
    }, [location.key]);

    return {
        hasError,
        setHasError,
    };
};

export default useError;
