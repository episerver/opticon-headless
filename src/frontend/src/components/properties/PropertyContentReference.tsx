import { ContentData } from '@episerver/content-delivery';
import React, { FC, lazy, Suspense } from 'react';

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
                 <source src={value.contentLink.url} type="video/mp4"/>
            </video>
        );
    }
    else if (value.contentType[0] === 'Image') {
        return (
            <img src={value.contentLink.url}
                className={className}
            />
        );
    }
    else if (value.contentType[0] === 'Page') {
        const View = lazy(() => import(`../pages/${value.contentType.at(-1)}`));
        return <div className={className}>
            <Suspense fallback={<div>Loading...</div>}>
                <View value={value}/>
            </Suspense>
        </div>
    }
    else if (value.contentType[0] === 'Block') {
        const View = lazy(() => import(`../blocks/${value.contentType.at(-1)}`));
        return <div className={className}>
            <Suspense fallback={<div>Loading...</div>}>
                <View value={value}/>
            </Suspense>
        </div>
    }
    return <></>;
}

export default PropertyContentReference;