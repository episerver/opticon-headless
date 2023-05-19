import React from "react";
import { ContentData } from "@episerver/content-delivery";
import { ContentArea } from "@models/property/ContentArea";
import PropertyContentArea from "@components/contents/properties/PropertyContentArea";
import PropertyXhtmlString from "@components/contents/properties/PropertyXhtmlString";

interface StandardPageProps extends ContentData {
    mainBody?: string;
    mainContentArea: ContentArea;
}

const StandardPage: React.FC<StandardPageProps> = (props): JSX.Element => {
    return (
        <>
            <PropertyContentArea value={props.mainContentArea} />
            <div className="container">
                <PropertyXhtmlString value={props?.mainBody ?? ""} />
            </div>
        </>
    );
};

export default StandardPage;
