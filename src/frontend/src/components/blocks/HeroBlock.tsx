import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyButton from '../properties/PropertyButton';
import PropertyContentReference from '../properties/PropertyContentReference';
import PropertyString from '../properties/PropertyString';
import PropertyUrl from '../properties/PropertyUrl';

interface HeroBlockProps {
    value?: ContentData;
}

const HeroBlock: FC<HeroBlockProps> = ({ value }): JSX.Element => {
    if (value == null || value == undefined) {
        return <></>;
    }
    return (
        <section className={value.isScreenWidth?.value ? "full-width h-screen" : "w-full h-screen relative"}>
            <PropertyContentReference value={value.backgroundVideo?.expandedValue} className="w-full h-full object-cover" />
            {!value.backgroundVideo?.expandedValue && (
                <PropertyContentReference value={value.backgroundImage?.expandedValue} className="w-full h-full object-cover" />
            )}
            <div className='absolute top-0 left-0 w-full h-full bg-gray-900/30'></div>
            <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center text-center'>
                <PropertyString value={value.title?.value} className="text-white mb-2" tag="h1" />
                <PropertyString value={value.description?.value} className="text-white text-sm mb-2" tag="h2" />
                <PropertyUrl href={value.link?.value} title="">
                    <PropertyButton title={value.buttonText?.value ?? "learn more"} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' />
                </PropertyUrl>
            </div>
        </section>
    );
};

export default HeroBlock;