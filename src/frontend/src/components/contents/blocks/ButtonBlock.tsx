import React from "react";
import { ContentData } from "@episerver/content-delivery";
import PropertyType from "@models/common/PropertyType";

interface ButtonBlockProps extends ContentData {
    text?: PropertyType;
    link?: PropertyType;
}

const ButtonBlock: React.FC<ButtonBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    return (
        <a
            href={props.link?.value}
            className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md ltr:mr-2 rtl:ml-2 mt-2"
        >
            {props.text?.value}
        </a>
    );
};

export default ButtonBlock;
