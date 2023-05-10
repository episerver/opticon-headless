import React from "react";

interface PropertyUrlProps {
    href?: string;
    className?: string;
    title: string;
    children?: JSX.Element;
}

const PropertyUrl: React.FC<PropertyUrlProps> = ({ href, className, title, children }): JSX.Element => {
    if (href == null || href == undefined) {
        return <></>;
    }

    if (children) {
        return (
            <a className={className} href={href} title={title}>
                {children}
            </a>
        );
    }

    return (
        <a className={className} href={href} title={title}>
            {title}
        </a>
    );
};

export default PropertyUrl;
