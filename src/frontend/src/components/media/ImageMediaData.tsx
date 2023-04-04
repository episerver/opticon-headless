import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';

interface ImageMediaDataProps extends ContentData {
    url?: string;
    title?: string;
}

const ImageMediaData: FC<ImageMediaDataProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    return (
    <a href={props.contentLink.url ?? '' }>
        <img src={props.url} alt={props.title} title={props.title} className="img-fluid lazyload" />
    </a>
    )
};

export default ImageMediaData;
