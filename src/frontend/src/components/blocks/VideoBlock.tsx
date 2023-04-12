import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '@components/properties/PropertyXhtmlString';
import { Video } from 'react-feather';

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
            { props.heading?.value &&
                <h1>{props.heading.value}</h1>
            } 
                
            <PropertyXhtmlString value={props.mainBody.value}/>
            <video {...{playsInline: true, controls: true}}>
                <source src={props.video.expandedValue.url} type="video/mp4"/>
            </video>
        </div>
    )
};

export default VideoBlock;
