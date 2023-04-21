import React, { FC } from 'react';

interface PropertyXhtmlStringProps {
    value?: string;
}

const PropertyXhtmlString: FC<PropertyXhtmlStringProps> = ({value}) : JSX.Element => {
    if (value === null) {
        return <></>  ;
    }
    return (
        <div dangerouslySetInnerHTML={{ __html: value ?? '' }} />
    );
};

export default PropertyXhtmlString;