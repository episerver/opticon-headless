import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '@components/contents/properties/PropertyXhtmlString';

interface VideoBlockProps extends ContentData {
    heading?: string;
    mainBody?: string;
    video?: any;
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
            <video {...{playsInline: true, controls: true}}>
                <source src={props.video.expandedValue.url} type="video/mp4"/>
            </video>
        </div>
    )
};

export default VideoBlock;
