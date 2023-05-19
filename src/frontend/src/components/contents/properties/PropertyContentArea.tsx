import React from "react";
import Loading from "@components/layout/Loading";
import { ContentArea } from "@models/property/ContentArea";
import loadable from "@loadable/component";

interface PropertyContentAreaProps {
    value: ContentArea;
}

const PropertyContentArea: React.FC<PropertyContentAreaProps> = ({ value }): JSX.Element => {
    if (value === null) {
        return <></>;
    }

    return (
        <>
            {value?.map((contentAreaItem, index) => {
                const content = contentAreaItem.contentLink.expanded;
                let View: any;
                if (content) {
                    const baseType = content.contentType.at(0);
                    switch (baseType) {
                        case "Page":
                            View = loadable(() => import(`@components/contents/pages/${content.contentType.at(-1)}`), {
                                fallback: <Loading />,
                            });
                            return (
                                <div key={index}>
                                    <View {...content} />
                                </div>
                            );
                        case "Video":
                        case "Image":
                            View = loadable(() => import(`@components/contents/media/${content.contentType.at(-1)}`), {
                                fallback: <Loading />,
                            });
                            return (
                                <div key={index}>
                                    <View {...content} />
                                </div>
                            );
                        case "Block":
                            View = loadable(() => import(`@components/contents/blocks/${content.contentType.at(-1)}`), {
                                fallback: <Loading />,
                            });
                            return (
                                <div key={index}>
                                    <View {...content} />
                                </div>
                            );
                        default:
                            return <></>;
                    }
                }
            })}
        </>
    );
};

export default PropertyContentArea;
