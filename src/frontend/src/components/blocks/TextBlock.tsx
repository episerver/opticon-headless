import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '../properties/PropertyXhtmlString';

interface TextBlockProps {
    value?: ContentData;
}

const TextBlock: FC<TextBlockProps> = ({ value }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }
    return (
        <div>
            <PropertyXhtmlString value={value.mainBody}/>
        </div>
    )
};

export default TextBlock;
