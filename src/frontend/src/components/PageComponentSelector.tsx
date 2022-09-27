import { ContentData, ContentResolver, defaultConfig, ResolvedContent } from "@episerver/content-delivery";
import Config from "../config.json";
import React, { lazy } from "react";
import { useLoaderData } from "react-router-dom";
import loadable from '@loadable/component';

export const PageDataLoader = async (): Promise<ContentData | undefined> => {
    let baseUrl = Config.BASE_URL;
    if (baseUrl === '$BASE_URL') {
        baseUrl = "http://localhost:5000/";
    }
    defaultConfig.apiUrl = `${baseUrl}api/episerver/v3.0`;
    defaultConfig.expandAllProperties = true;
    const contentResolver = new ContentResolver(defaultConfig);
    const content = await contentResolver.resolveContent(window.location.pathname, true);
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

