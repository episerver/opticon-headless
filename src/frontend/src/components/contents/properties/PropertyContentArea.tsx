import React from "react";
import Loading from "@components/layout/Loading";
import { ContentArea } from "@models/property/ContentArea";
import loadable from "@loadable/component";

interface PropertyContentAreaProps {
    value: ContentArea;
}

const mappingDisplayOptionToTailwindCssClass = (option: string) => {
    switch (option) {
        case "onesixth":
            return "col-span-2";
        case "onefourth":
            return "col-span-3";
        case "onethird":
            return "col-span-4";
        case "half":
            return "col-span-6";
        case "twothird":
            return "col-span-8";
        case "threefourth":
            return "col-span-9";
        case "fivesixth":
            return "col-span-10";
        case "full":
        default:
            return "col-span-12";
    }
};

const PropertyContentArea: React.FC<PropertyContentAreaProps> = ({ value }): JSX.Element => {
    if (value === null) {
        return <></>;
    }

    return (
        <div className="grid grid-cols-12">
            {value?.map((contentAreaItem, index) => {
                const content = contentAreaItem.contentLink.expanded;
                const displayOptionClass = mappingDisplayOptionToTailwindCssClass(contentAreaItem.displayOption);
                let View: any;
                if (content) {
                    const baseType = content.contentType.at(0);
                    switch (baseType) {
                        case "Page":
                            View = loadable(() => import(`@components/contents/pages/${content.contentType.at(-1)}`), {
                                fallback: <Loading />,
                            });
                            return (
                                <div key={index} className={displayOptionClass}>
                                    <View {...content} />
                                </div>
                            );
                        case "Video":
                        case "Image":
                            View = loadable(() => import(`@components/contents/media/${content.contentType.at(-1)}`), {
                                fallback: <Loading />,
                            });
                            return (
                                <div key={index} className={displayOptionClass}>
                                    <View {...content} />
                                </div>
                            );
                        case "Block":
                            View = loadable(() => import(`@components/contents/blocks/${content.contentType.at(-1)}`), {
                                fallback: <Loading />,
                            });
                            return (
                                <div key={index} className={displayOptionClass}>
                                    <View {...content} />
                                </div>
                            );
                        default:
                            return <></>;
                    }
                }
            })}
        </div>
    );
};

export default PropertyContentArea;
