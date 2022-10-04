import { ContentData  } from "@episerver/content-delivery";
import {  getContentResolver } from "../DefaultContext";
import Config from "../config.json";
import React, { lazy, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import loadable from '@loadable/component';

export const PageDataLoader = async (): Promise<ContentData | undefined> => {
    const context = getContentResolver();
    const content = await  context.resolveContent(window.location.pathname, true);
    return content.content;
}

const PageComponentSelector = () => {
    const content = useLoaderData() as ContentData;
    if (content === null || content === undefined) {
        return <></>;
    }
    const View = loadable(() => import(`./pages/${content.contentType.at(-1)}`), {
        fallback: <div>Loading...</div>,
    });
    return (
        <View value={content} />
    );
};

export default PageComponentSelector;

