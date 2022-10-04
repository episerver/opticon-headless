import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';

interface ImageMediaDataProps {
    value?: ContentData;
}

const ImageMediaData: FC<ImageMediaDataProps> = ({ value }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }
    return (
    <a href={value.link.url ?? '' }>
        <img src={value.url} alt={value.title} title={value.title} class="img-fluid lazyload" />
    </a>
    )
};

export default ImageMediaData;
