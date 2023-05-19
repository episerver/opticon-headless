import React from "react";
import { ContentData } from "@episerver/content-delivery";
import PropertyXhtmlString from "@components/contents/properties/PropertyXhtmlString";

interface VimeoBlockProps extends ContentData {
    heading?: string;
    mainBody?: string;
    link?: string;
}

const VimeoBlock: React.FC<VimeoBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    const { heading, mainBody, link } = props;
    return (
        <div>
            {heading && <h1>{heading}</h1>}

            <PropertyXhtmlString value={mainBody} />
            <iframe
                {...{
                    src: link,
                    frameBorder: "0",
                    allow: "autoplay; fullscreen",
                    webkitallowfullscreen: true,
                    mozallowfullscreen: true,
                    allowfullscreen: true,
                }}
            />
        </div>
    );
};

export default VimeoBlock;
