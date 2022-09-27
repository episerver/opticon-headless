import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';

interface PropertyContentReferenceProps {
    value?: ContentData;
    className?: string;
}

const PropertyContentReference: FC<PropertyContentReferenceProps> = ({ value, className }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }

    if (value.contentType[0] === 'Video') {
        return (
            <video className={className}
                autoPlay
                loop
                muted
            >
                 <source src={value.url} type="video/mp4"/>
            </video>
        );
    }
    else if (value.contentType[0] === 'Image') {
        return (
            <img src={value.url}
                className={className}
            />
        );
    }
    else if (value.contentType[0] === 'Page') {
        const View = loadable(() => import(`../pages/${value.contentType.at(-1)}`), {
            fallback: <div>Loading...</div>,
        });
        return <div className={className}>
            <View value={value}/>
        </div>
    }
    else if (value.contentType[0] === 'Block') {
        const View = loadable(() => import(`../blocks/${value.contentType.at(-1)}`), {
            fallback: <div>Loading...</div>,
        });
        return <div className={className}>
            <View value={value}/>
        </div>
    }
    return <></>;
}

export default PropertyContentReference;