import { ContentData } from "@episerver/content-delivery";
import React, { FC } from "react";

interface BlogItemProps extends ContentData{}

const BlogItem: FC<BlogItemProps> = (props): JSX.Element => {
    return (
        <section className="container mx-auto">
        </section>
    );
};

export default BlogItem;
