import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';

interface ButtonBlockProps {
    value?: ContentData;
}

const ButtonBlock: FC<ButtonBlockProps> = ({ value }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }
    return (
        <div className="">
            <a className=""
                title={value.text}
                href={value.link}>
                {value.text}
            </a>
    
        </div>
    )
};

export default ButtonBlock;
