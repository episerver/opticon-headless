import { ContentData } from '@episerver/content-delivery';
import React, { FC } from 'react';
import PropertyContentArea from '../properties/PropertyContentArea';
import PropertyXhtmlString from '../properties/PropertyXhtmlString';

interface StandardProps {
    value?: ContentData;
}

const Standard : FC<StandardProps> = ({value}) : JSX.Element => {
    return (
        <section className='container mx-auto'>
            <PropertyXhtmlString value={value?.mainBody ?? ''}/>
            <PropertyContentArea value={value?.mainContentArea} />
        </section>
    );
};

export default Standard;