import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '../properties/PropertyXhtmlString';

interface VimeoBlockProps {
    value?: ContentData;
}

const VimeoBlock: FC<VimeoBlockProps> = ({ value }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }
    return (
        <div>
            { value.heading &&
                <h1>{value.heading}</h1>
            } 
                
            <PropertyXhtmlString value={value.mainBody}/>
            <iframe src={value.link} frameborder="0" allow="autoplay; fullscreen" webkitallowfullscreen mozallowfullscreen allowfullscreen/>
        </div>
    )
};

export default VimeoBlock;
