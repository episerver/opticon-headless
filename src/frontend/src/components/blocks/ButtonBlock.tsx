import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';

interface ButtonBlockProps extends ContentData {
    text?: string;
    link?: string;
}

const ButtonBlock: FC<ButtonBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    return (
        <div className="">
            <a className=""
                title={props.text}
                href={props.link}>
                {props.text}
            </a>
    
        </div>
    )
};

export default ButtonBlock;
