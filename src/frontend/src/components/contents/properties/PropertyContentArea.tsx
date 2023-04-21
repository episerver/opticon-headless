import React, { FC, lazy, Suspense } from 'react';
import Loading from '@components/layout/Loading';
import { ContentArea } from '@models/property/ContentArea';

interface PropertyContentAreaProps {
    value: ContentArea;
}

const PropertyContentArea: FC<PropertyContentAreaProps> = ({ value }): JSX.Element => {
    if (value === null) {
        return <></>;
    }

    return (
        <>
            {value?.map((contentAreaItem, index) => {
                const content = contentAreaItem.contentLink.expanded;
                if(content){
                    const baseType = content.contentType.at(0);
                    if (baseType=== 'Page') {
                        const View = lazy(() => import(`@components/contents/pages/${content.contentType.at(-1)}`));
                        return <Suspense key={index} fallback={<Loading/>}>
                                    <View {...content}/>
                                </Suspense>
                    }
                    else if (baseType === 'Video') {
                        const View = lazy(() => import(`@components/contents/media/${content.contentType.at(-1)}`));
                        return <Suspense key={index} fallback={<Loading/>}>
                                    <View {...content}/>
                                </Suspense>
                    }
                    else if (baseType === 'Image') {
                        const View = lazy(() => import(`@components/contents/media/${content.contentType.at(-1)}`));
                        return <Suspense key={index} fallback={<Loading/>}>
                                    <View {...content}/>
                                </Suspense>
                    }
                    else if (baseType === 'Block') {
                        const View = lazy(() => import(`@components/contents/blocks/${content.contentType.at(-1)}`));
                        return <Suspense key={index} fallback={<Loading/>}>
                                    <View {...content}/>
                                </Suspense>
                    }
                }
                return <></>;
            })}
        </>
    );
};

export default PropertyContentArea;