import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '../properties/PropertyXhtmlString';

interface VimeoBlockProps extends ContentData {
    heading?: string;
    mainBody?: string;
    link?: string;
}

const VimeoBlock: FC<VimeoBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    const {heading, mainBody, link} = props;
    return (
        <div>
            { heading &&
                <h1>{heading}</h1>
            } 
                
            <PropertyXhtmlString value={mainBody}/>
            <iframe {...{
                src: link, 
                frameBorder: "0", 
                allow: "autoplay; fullscreen", 
                webkitallowfullscreen: true, 
                mozallowfullscreen: true, 
                allowfullscreen: true
            }}
            />
        </div>
    )
};

export default VimeoBlock;
