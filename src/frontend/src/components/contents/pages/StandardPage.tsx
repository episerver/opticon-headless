import { ContentData } from "@episerver/content-delivery";
import React, { FC } from "react";
import PropertyContentArea from "@components/contents/properties/PropertyContentArea";
import PropertyXhtmlString from "@components/contents/properties/PropertyXhtmlString";
import { ContentArea } from "@models/property/ContentArea";

interface StandardProps extends ContentData {
    mainBody?: string;
    mainContentArea: ContentArea;
}

const StandardPage: FC<StandardProps> = (props): JSX.Element => {
    return (
        <>
            <PropertyContentArea value={props.mainContentArea} />
            <PropertyXhtmlString value={props?.mainBody ?? ""} />
        </>
    );
};

export default StandardPage;
