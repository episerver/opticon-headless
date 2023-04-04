import { ContentData } from "@episerver/content-delivery";
import React, { FC } from "react";
import { ContentArea } from "../../models/ContentArea";
import PropertyContentArea from "../properties/PropertyContentArea";
import PropertyXhtmlString from "../properties/PropertyXhtmlString";

interface BlogListProps extends ContentData{}

const BlogList: FC<BlogListProps> = (props): JSX.Element => {
    return (
        <section className="container mx-auto">
        </section>
    );
};

export default BlogList;
