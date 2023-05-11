import React from "react";
import PropertyType from "@models/common/PropertyType";
import { ContentData } from "@episerver/content-delivery";
import PropertyXhtmlString from "../properties/PropertyXhtmlString";
import BlockType from "@models/block/BlockType";

interface RichContentBlockProps extends ContentData, BlockType {
    backgroundImage1?: PropertyType;
    backgroundImage2?: PropertyType;
    mainBody?: PropertyType;
}

const RichContentBlock: React.FC<RichContentBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    return (
        <div
            className={`container ${props.backgroundImage2 ? `pb-16` : ``}`}
            style={{ marginTop: `${props.marginTop.value}px`, marginBottom: `${props.marginBottom.value}px` }}
        >
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                <div className="lg:col-span-5 md:col-span-6">
                    <div className="relative">
                        <img
                            src={props.backgroundImage1?.value.url}
                            className="rounded-full lg:w-[400px] w-[280px]"
                            alt=""
                        />
                        <div className="absolute ltr:-right-5 rtl:-left-5 -bottom-16">
                            <img
                                src={props.backgroundImage2?.value.url}
                                className="rounded-full lg:w-[280px] w-[200px] border-8 border-white dark:border-slate-900"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-7 md:col-span-6 mt-8 md:mt-0">
                    <div className="ltr:lg:ml-5 rtl:lg:mr-5">
                        <PropertyXhtmlString value={props.mainBody?.value} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RichContentBlock;
