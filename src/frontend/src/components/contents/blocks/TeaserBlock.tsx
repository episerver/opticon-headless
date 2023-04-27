import React from "react";
import { ContentData } from "@episerver/content-delivery";
import Background from "../../../../import/images/teaser-blocks/teaser1.jpg";

interface TeaserBlockProps extends ContentData {
    title?: any;
    description?: any;
    backgroundImage?: any;
}

const TeaserBlock: React.FC<TeaserBlockProps | null> = (props): JSX.Element => {
    console.log("PROPS", props);
    if (!props) {
        return <></>;
    }
    return (
        <div className="relative table w-full py-36 lg:py-64">
            <div
                className="absolute inset-0"
                style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundImage: `url(${props.backgroundImage?.value.url})`,
                    transition: "all 500ms ease-in 0s",
                }}
            ></div>
            <div className="absolute inset-0 ltr:md:bg-gradient-to-l rtl:md:bg-gradient-to-r md:from-transparent md:via-indigo-600/80 md:to-indigo-800"></div>
            <div className="container">
                <div className="grid grid-cols-1">
                    <div className="ltr:md:text-left rtl:md:text-right text-center mt-10">
                        <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">
                            {props.title.value}
                        </h1>
                        <p className="text-white/70 text-xl max-w-xl">{props.description.value}</p>
                        <a href="">
                            <i className="mdi mdi-arrow-down text-center inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-900 h-12 w-12 mx-auto shadow-md dark:shadow-gray-800 mt-6"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeaserBlock;
