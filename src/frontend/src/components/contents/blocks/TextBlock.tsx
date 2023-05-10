import React from "react";
import PropertyType from "@models/common/PropertyType";
import { ContentData } from "@episerver/content-delivery";
import PropertyXhtmlString from "@components/contents/properties/PropertyXhtmlString";
import BlockType from "@models/block/BlockType";

interface TextBlockProps extends ContentData, BlockType {
    title?: PropertyType;
    mainBody?: PropertyType;
}

const TextBlock: React.FC<TextBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    return (
        <div
            className="container text-center"
            style={{ marginTop: `${props.marginTop.value}px`, marginBottom: `${props.marginBottom.value}px` }}
        >
            <h1 className="mb-6 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
                {props.title?.value}
            </h1>
            <PropertyXhtmlString value={props.mainBody?.value} />
        </div>
    );
};

export default TextBlock;
