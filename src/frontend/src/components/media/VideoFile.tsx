import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';

interface VideoFileProps {
    value?: ContentData;
    autoPlay?: boolean;
    displayControls?: boolean;
}

const VideoFile: FC<VideoFileProps> = (props): JSX.Element => {
    if (!props.value) {
        return <></>;
    }
    const { value, autoPlay, displayControls } = props;
    return (
        <div>
            <video className="video-file__frame" autoPlay={autoPlay} disableRemotePlayback={displayControls}>
                <source src={props.value.contentLink.url} type="video/mp4"/>
                Your browser does not support HTML5 video.
            </video>
        </div>
    )
};

export default VideoFile;
