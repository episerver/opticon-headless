import React, { FC, lazy, Suspense } from 'react';
import { ContentArea } from '@models/ContentArea';
import Loading from '@components/common/Loading';

interface PropertyContentAreaProps {
    value: ContentArea;
}

const PropertyContentArea: FC<PropertyContentAreaProps> = ({ value }): JSX.Element => {
    if (value === null) {
        return <></>;
    }

    return (
        <section className="flex flex-row flex-wrap">
            {value?.map((contentAreaItem, index) => {
                const className = getClassName(contentAreaItem.displayOption);   
                const content = contentAreaItem.contentLink.expanded;
                if(content){
                    const baseType = content.contentType.at(0);
                    if (baseType=== 'Page') {
                        const View = lazy(() => import(`@components/pages/${content.contentType.at(-1)}`));
                        return <div key={index} className={className}>
                            <Suspense fallback={<Loading/>}>
                                <View {...content}/>
                            </Suspense>
                        </div>
                    }
                    else if (baseType === 'Video') {
                        const View = lazy(() => import(`@components/media/${content.contentType.at(-1)}`));
                        return <div key={index} className={className}>
                            <Suspense fallback={<Loading/>}>
                                <View {...content}/>
                            </Suspense>
                        </div>
                    }
                    else if (baseType === 'Image') {
                        const View = lazy(() => import(`@components/media/${content.contentType.at(-1)}`));
                        return <div key={index} className={className}>
                            <Suspense fallback={<Loading/>}>
                                <View {...content}/>
                            </Suspense>
                        </div>
                    }
                    else if (baseType === 'Block') {
                        const View = lazy(() => import(`@components/blocks/${content.contentType.at(-1)}`));
                        return <div key={index} className={className}>
                            <Suspense fallback={<Loading/>}>
                                <View {...content}/>
                            </Suspense>
                        </div>
                    }
                }
                return <></>;
            })}
        </section>
    );
};

const getClassName = (displayOption: string): string => {
    if (displayOption === null || undefined) {
        return "basis-full";
    }
    return "basis-full";
}

export default PropertyContentArea;