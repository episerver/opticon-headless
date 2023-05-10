import React from "react";

interface PropertyStringProps {
    value?: string;
    className?: string;
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h5" | "span";
}

const PropertyString: React.FC<PropertyStringProps> = ({ value, className, tag }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }

    if (tag === "h1") {
        return <h1 className={className}>{value}</h1>;
    } else if (tag === "h2") {
        return <h2 className={className}>{value}</h2>;
    } else if (tag === "h3") {
        return <h3 className={className}>{value}</h3>;
    } else if (tag === "h4") {
        return <h4 className={className}>{value}</h4>;
    } else if (tag === "h5") {
        return <h5 className={className}>{value}</h5>;
    } else if (tag === "span") {
        return <span className={className}>{value}</span>;
    }
    return <></>;
};

export default PropertyString;
