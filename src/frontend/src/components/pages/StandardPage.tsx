import { ContentData } from "@episerver/content-delivery";
import React, { FC } from "react";
import { ContentArea } from "@models/ContentArea";
import PropertyContentArea from "@components/properties/PropertyContentArea";
import PropertyXhtmlString from "@components/properties/PropertyXhtmlString";

interface StandardProps extends ContentData{
    mainBody?: string;
    mainContentArea: ContentArea;
}

const Standard: FC<StandardProps> = (props): JSX.Element => {
    return (
        <section className="container mx-auto">
            <PropertyXhtmlString value={props?.mainBody ?? ""} />
            <PropertyContentArea value={props.mainContentArea} />
        </section>
    );
};

export default Standard;
