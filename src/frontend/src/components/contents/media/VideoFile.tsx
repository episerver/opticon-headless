import React from "react";
import { ContentData } from "@episerver/content-delivery";

interface VideoFileProps {
    value?: ContentData;
    autoPlay?: boolean;
    displayControls?: boolean;
}

const VideoFile: React.FC<VideoFileProps> = (props): JSX.Element => {
    if (!props.value) {
        return <></>;
    }
    const { autoPlay, displayControls } = props;
    return (
        <div>
            <video className="video-file__frame" autoPlay={autoPlay} disableRemotePlayback={displayControls}>
                <source src={props.value.contentLink.url} type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
        </div>
    );
};

export default VideoFile;
