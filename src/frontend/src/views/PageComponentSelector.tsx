import { ContentData, ResolvedContent, ResolvedContentStatus } from "@episerver/content-delivery";
import { getContentResolver } from "../DefaultContext";
import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import Loading from "@components/layout/Loading";
import AuthService from "../AuthService";
import loadable from "@loadable/component";

export const PageDataLoader = async ({ request }: any): Promise<ResolvedContent<ContentData>> => {
    const url = new URL(request.url);
    const context = getContentResolver();
    const resolveContent = await context.resolveContent(url.pathname, true);
    return resolveContent;
};

const PageComponentSelector = () => {
    const resolveContent = useLoaderData() as ResolvedContent<ContentData>;
    if (!resolveContent.content) {
        return <Navigate to="/not-found" />;
    }

    switch (resolveContent.status) {
        case ResolvedContentStatus.NotFound:
            return <Navigate to="/not-found" />;
        case ResolvedContentStatus.Unauthorized:
            AuthService.signIn();
            return <></>;
        case ResolvedContentStatus.AccessDenied:
            return <Navigate to="/access-denied" />;
    }

    const View = loadable(() => import(`@components/contents/pages/${resolveContent.content?.contentType.at(-1)}`), {
        fallback: <Loading />,
    });

    return <View {...resolveContent.content} />;
};

export default PageComponentSelector;
