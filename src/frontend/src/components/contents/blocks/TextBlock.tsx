import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '@components/contents/properties/PropertyXhtmlString';

interface TextBlockProps extends ContentData {
    mainBody?: string;
}

const TextBlock: FC<TextBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    return (
        <div>
            <PropertyXhtmlString value={props.mainBody}/>
        </div>
    )
};

export default TextBlock;
