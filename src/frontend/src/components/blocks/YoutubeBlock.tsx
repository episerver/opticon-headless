import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '../properties/PropertyXhtmlString';

interface YoutubeBlockProps {
    value?: ContentData;
}

const YoutubeBlock: FC<YoutubeBlockProps> = ({ value }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }
    return (
        <div>
            <div className="w-full">
                { value.heading &&
                    <h1>{value.heading}</h1>
                } 
                
                <PropertyXhtmlString value={value.mainBody}/>
                <div className="relative w-full p-[56.25%]">
                    <iframe src={value.link} className="absolute top-0 left-0 w-full h-full border-0"/>
                </div>
            </div>
        </div>
    )};

export default YoutubeBlock;
