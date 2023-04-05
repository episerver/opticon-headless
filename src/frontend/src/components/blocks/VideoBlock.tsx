import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '@components/properties/PropertyXhtmlString';

interface VideoBlockProps extends ContentData {
    heading?: string;
    mainBody?: string;
    link?: string;
}

const VideoBlock: FC<VideoBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    return (
        <div>
            { props.heading &&
                <h1>{props.heading}</h1>
            } 
                
            <PropertyXhtmlString value={props.mainBody}/>
            <video {...{playsInline: true, seeking: true, controls: true}}>
                <source src={props.link} type="video/mp4"/>
            </video>
        </div>
    )
};

export default VideoBlock;
