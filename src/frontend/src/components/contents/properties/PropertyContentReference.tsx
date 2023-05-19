import React from "react";
import Loading from "@components/layout/Loading";
import { ContentData } from "@episerver/content-delivery";
import loadable from "@loadable/component";

interface PropertyContentReferenceProps {
    value?: ContentData;
    className?: string;
}

const PropertyContentReference: React.FC<PropertyContentReferenceProps> = ({ value, className }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }

    let View: any;
    switch (value.contentType[0]) {
        case "Video":
        case "Image":
            View = loadable(() => import(`@components/contents/media/${value.contentType.at(-1)}`), {
                fallback: <Loading />,
            });
            return (
                <div className={className}>
                    <View {...value} />
                </div>
            );

        case "Page":
            View = loadable(() => import(`@components/contents/pages/${value.contentType.at(-1)}`), {
                fallback: <Loading />,
            });
            return (
                <div className={className}>
                    <View {...value} />
                </div>
            );
        case "Block":
            View = loadable(() => import(`@components/contents/blocks/${value.contentType.at(-1)}`), {
                fallback: <Loading />,
            });
            return (
                <div className={className}>
                    <View {...value} />
                </div>
            );
        default:
            return <></>;
    }
};

export default PropertyContentReference;
