import { ContentData } from "@episerver/content-delivery";
import React, { FC } from "react";
import PropertyContentArea from "@components/contents/properties/PropertyContentArea";
import PropertyXhtmlString from "@components/contents/properties/PropertyXhtmlString";
import { ContentArea } from "@models/property/ContentArea";

interface StandardProps extends ContentData{
    mainBody?: string;
    mainContentArea: ContentArea;
}

const StandardPage: FC<StandardProps> = (props): JSX.Element => {
    return (
        <>
           <PropertyXhtmlString value={props?.mainBody ?? ""} />
           <PropertyContentArea value={props.mainContentArea} />
        </>
    );
};

export default StandardPage;
