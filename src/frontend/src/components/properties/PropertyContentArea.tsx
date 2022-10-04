import React, { FC, useEffect, useContext } from 'react';
import { ContentArea } from '../../models/ContentArea';
import loadable from '@loadable/component';
import { ContentData, ContentLoader, defaultConfig } from '@episerver/content-delivery';
import { getContentLoader } from "../../DefaultContext";

interface PropertyContentAreaProps {
    value: ContentArea | null;
}

const PropertyContentArea: FC<PropertyContentAreaProps> = ({ value }): JSX.Element => {

    if (value === null) {
        return <></>;
    }

    const [expandedContentArea, setExpandedContentArea] = React.useState<ContentArea | null>(null);

    useEffect(() => {
        expandContentArea(value)
            .then(result => {
                setExpandedContentArea(result);
            });
    }, []);
    return (
        <section className="flex flex-row flex-wrap">
            {expandedContentArea?.map((contentAreaItem, index) => {
                const className = getClassName(contentAreaItem.displayOption);
                const content = contentAreaItem.contentLink.expanded;
                if (content === undefined) {
                    return <></>;
                }
                
                const baseType = content.contentType.at(0);
                if (baseType=== 'Page') {
                    const View = loadable(() => import(`../pages/${content.contentType.at(-1)}`), {
                        fallback: <div>Loading...</div>,
                    });
                    return <div key={index} className={className}>
                        <View value={content}/>
                    </div>
                }
                else if (baseType === 'Video') {
                    const View = loadable(() => import(`../media/${content.contentType.at(-1)}`), {
                        fallback: <div>Loading...</div>,
                    });
                    return <div key={index} className={className}>
                        <View value={content}/>
                    </div>
                }
                else if (baseType === 'Image') {
                    const View = loadable(() => import(`../media/${content.contentType.at(-1)}`), {
                        fallback: <div>Loading...</div>,
                    });
                    return <div key={index} className={className}>
                        <View value={content}/>
                    </div>
                }
                else if (baseType === 'Block') {
                    const View = loadable(() => import(`../blocks/${content.contentType.at(-1)}`), {
                        fallback: <div>Loading...</div>,
                    });
                    return <div key={index} className={className}>
                        <View value={content}/>
                    </div>
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

const getContentData = async (id: string): Promise<ContentData> => {
    const contentLoader = getContentLoader();
    const content = await contentLoader.getContent(id);
    return content;
}

const expandContentArea = async (contentArea: ContentArea | null): Promise<ContentArea | null> => {
    if (contentArea === null) {
        return null;
    }
    for (let index = 0; index < contentArea.length; index++) {

        for (var key in contentArea[index].contentLink.expanded) {
            if (key !== 'contentLink' && key !== 'parentLink' && contentArea[index].contentLink.expanded[key].guidValue) {
                const referencedContent = await getContentData(contentArea[index].contentLink.expanded[key].guidValue);
                contentArea[index].contentLink.expanded[key].expanded = referencedContent;
               
            }
        }
    }
    return contentArea;
}

export default PropertyContentArea;