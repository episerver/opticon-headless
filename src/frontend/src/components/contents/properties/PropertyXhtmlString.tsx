import React from "react";

interface PropertyXhtmlStringProps {
    value?: string;
}

const PropertyXhtmlString: React.FC<PropertyXhtmlStringProps> = ({ value }): JSX.Element => {
    if (value === null) {
        return <></>;
    }
    return (
        <div className="container">
            <div dangerouslySetInnerHTML={{ __html: value ?? "" }} />
        </div>
    );
};

export default PropertyXhtmlString;
