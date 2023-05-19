import React from "react";
import { ContentData } from "@episerver/content-delivery";
import PropertyType from "@models/common/PropertyType";

interface HeroBlockProps extends ContentData {
    fullWidth: PropertyType;
    height: PropertyType;
    backgroundVideo: PropertyType;
    backgroundImage: PropertyType;
    overlayColor: PropertyType;
    overlayColorOpacity: PropertyType;
    calloutTextColor: PropertyType;
    calloutVerticalAlign: PropertyType;
    calloutHorizontalAlign: PropertyType;
    mainBody: PropertyType;
}

const HeroBlock: React.FC<HeroBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    return (
        <div className={props.fullWidth.value ? "" : "container"}>
            <div className="pb-[50%] relative truncate" style={{ paddingBottom: `${props.height.value}%` }}>
                {props.backgroundVideo?.expandedValue ? (
                    <div className="absolute w-full h-full">
                        <video className="w-full h-auto" autoPlay={true} loop={true} playsInline={true} muted={true}>
                            <source src={props.backgroundVideo.expandedValue.url} type="video/mp4" />
                        </video>
                    </div>
                ) : props.backgroundImage?.expandedValue ? (
                    <div
                        className="absolute w-full h-full bg-cover bg-no-repeat bg-top"
                        style={{ backgroundImage: `url(${props.backgroundImage.expandedValue.url})` }}
                    ></div>
                ) : (
                    <></>
                )}

                <div
                    className="absolute w-full h-full"
                    style={{ backgroundColor: props.overlayColor.value, opacity: props.overlayColorOpacity.value }}
                ></div>
                <div
                    className="absolute w-full h-full flex flex-col"
                    style={{ justifyContent: props.calloutVerticalAlign.value }}
                >
                    <div
                        className="relative p-0 m-12"
                        style={{ color: props.calloutTextColor.value, textAlign: props.calloutHorizontalAlign.value }}
                    >
                        <div
                            className="no-tailwindcss-base"
                            dangerouslySetInnerHTML={{ __html: props.mainBody.value ?? "" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBlock;
