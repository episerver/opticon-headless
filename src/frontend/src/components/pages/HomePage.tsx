import { ContentData } from "@episerver/content-delivery";
import React, { FC } from "react";
import { ContentArea } from "../../models/ContentArea";
import PropertyContentArea from "../properties/PropertyContentArea";
import PropertyXhtmlString from "../properties/PropertyXhtmlString";

interface HomePageProps extends ContentData {
    mainBody?: string;
    mainContentArea: ContentArea;
}

const Home: FC<HomePageProps> = (props): JSX.Element => {
    return (
        <section className="container mx-auto">
            <PropertyXhtmlString value={props?.mainBody ?? ""} />
            <PropertyContentArea value={props.mainContentArea} />
        </section>
    );
};

export default Home;
