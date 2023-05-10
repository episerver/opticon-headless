import React from "react";

interface PropertyXhtmlStringProps {
    value?: string;
}

const PropertyXhtmlString: React.FC<PropertyXhtmlStringProps> = ({ value }): JSX.Element => {
    if (value === null) {
        return <></>;
    }
    return <div className="no-tailwindcss-base" dangerouslySetInnerHTML={{ __html: value ?? "" }} />;
};

export default PropertyXhtmlString;
