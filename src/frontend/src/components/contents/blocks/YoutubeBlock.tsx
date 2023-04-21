import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyXhtmlString from '@components/contents/properties/PropertyXhtmlString';

interface YoutubeBlockProps extends ContentData {
    heading?: string;
    mainBody?: string;
    link?: string;
}

const YoutubeBlock: FC<YoutubeBlockProps> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    const {heading, mainBody, link} = props;
    return (
        <div>
            <div className="w-full">
                { heading &&
                    <h1>{heading}</h1>
                } 
                
                <PropertyXhtmlString value={mainBody}/>
                <div className="relative w-full p-[56.25%]">
                    <iframe src={link} className="absolute top-0 left-0 w-full h-full border-0"/>
                </div>
            </div>
        </div>
    )};

export default YoutubeBlock;
