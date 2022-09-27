import React, { FC, useEffect } from 'react';
import { ContentArea } from '../../models/ContentArea';
import loadable from '@loadable/component';
import { ContentData, ContentLoader, defaultConfig } from '@episerver/content-delivery';
import Config from "../../config.json";

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
            {expandedContentArea?.value.map((contentAreaItem, index) => {
                const className = getClassName(contentAreaItem.displayOption);
                const content = expandedContentArea.expandedValue[index];
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
    let baseUrl = Config.BASE_URL;
    if (baseUrl === '$BASE_URL') {
        baseUrl = "http://localhost:5000/";
    }
    defaultConfig.apiUrl = `${baseUrl}api/episerver/v3.0`;
    defaultConfig.expandAllProperties = true;
    const contentLoader = new ContentLoader(defaultConfig);
    const content = await contentLoader.getContent(id);
    return content;
}

const expandContentArea = async (contentArea: ContentArea | null): Promise<ContentArea | null> => {
    if (contentArea === null || contentArea.value === null) {
        return null;
    }
    for (let index = 0; index < contentArea.value.length; index++) {
        if (!contentArea.expandedValue) {
            contentArea.expandedValue = Array<ContentData>(0)
        }
        if (!contentArea.expandedValue[index] === undefined) {
            const content = await getContentData(contentArea.value[index].contentLink.guidValue)
            contentArea.expandedValue.push(content);
        }
    }
    for (let index = 0; index < contentArea.expandedValue.length; index++) {

        for (var key in contentArea.expandedValue[index]) {
            if (contentArea.expandedValue[index][key] instanceof Object && (contentArea.expandedValue[index][key].propertyDataType ?? '') === 'PropertyContentReference'
                && contentArea.expandedValue[index][key].value !== undefined) {
                
                const referencedContent = await getContentData(contentArea.expandedValue[index][key].value.guidValue);
                contentArea.expandedValue[index][key].expandedValue = referencedContent;
               
            }
        }
    }
    return contentArea;
}

export default PropertyContentArea;