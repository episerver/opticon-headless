import React, { FC } from 'react';

interface PropertyButtonProps {
    className?: string;
    title?: string;
}

const PropertyButton: FC<PropertyButtonProps> = ({ className, title }): JSX.Element => {
    if (title == null || title == undefined) {
        return <></>;
    }
        
    return (<button className={className}>{title}</button>)
    
}

export default PropertyButton;