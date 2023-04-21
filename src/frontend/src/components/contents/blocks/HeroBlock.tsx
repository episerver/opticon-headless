import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyButton from '@components/contents/properties/PropertyButton';
import PropertyContentReference from '@components/contents/properties/PropertyContentReference';
import PropertyString from '@components/contents/properties/PropertyString';
import PropertyUrl from '@components/contents/properties/PropertyUrl';

interface HeroBlockProps extends ContentData {
    isScreenWidth: boolean;
    backgroundVideo?: ContentData;
    backgroundImage?: ContentData;
    title?: string;
    description: string;
    link?: string;
    buttonText?: string;
}

const HeroBlock: FC<HeroBlockProps | null> = (props): JSX.Element => {
    if (!props) {
        return <></>;
    }
    return (
        <section className={props.isScreenWidth ? "full-width h-screen" : "w-full h-screen relative"}>
            <PropertyContentReference value={props.backgroundVideo?.contentLink.expanded} className="w-full h-full object-cover" />
            {!props.backgroundVideo?.contentLink.expanded && (
                <PropertyContentReference value={props.backgroundImage?.contentLink.expanded} className="w-full h-full object-cover" />
            )}
            <div className='absolute top-0 left-0 w-full h-full bg-gray-900/30'></div>
            <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center text-center'>
                <PropertyString value={props.title} className="text-white mb-2" tag="h1" />
                <PropertyString value={props.description} className="text-white text-sm mb-2" tag="h2" />
                <PropertyUrl href={props.link} title="">
                    <PropertyButton title={props.buttonText ?? "learn more"} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' />
                </PropertyUrl>
            </div>
        </section>
    );
};

export default HeroBlock;