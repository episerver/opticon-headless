import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '../properties/PropertyXhtmlString';

interface VideoBlockProps {
    value?: ContentData;
}

const VideoBlock: FC<VideoBlockProps> = ({ value }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }
    return (
        <div>
            { value.heading &&
                <h1>{value.heading}</h1>
            } 
                
            <PropertyXhtmlString value={value.mainBody}/>
            <video playsinline seeking controls>
                <source src={value.link} type="video/mp4"/>
            </video>
        </div>
    )
};

export default VideoBlock;
