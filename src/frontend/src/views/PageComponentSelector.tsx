import { ContentData, ResolvedContent, ResolvedContentStatus } from "@episerver/content-delivery";
import { getContentResolver } from "../DefaultContext";
import React, { lazy, Suspense } from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import Loading from "@components/common/Loading";
import AuthService from "../AuthService";

export const PageDataLoader = async ({ request }: any): Promise<ResolvedContent<ContentData>> => {
    const url = new URL(request.url);
    const context = getContentResolver();
    const resolveContent = await context.resolveContent(url.pathname, true);
    return resolveContent;
};

const PageComponentSelector = () => {
    const resolveContent = useLoaderData() as ResolvedContent<ContentData>;
    if (!resolveContent.content) {
        return <Navigate to="/not-found" replace />;
    }

    switch (resolveContent.status) {
        case ResolvedContentStatus.NotFound: 
            return <Navigate to="/not-found" replace />;
        case ResolvedContentStatus.Unauthorized:
          AuthService.getUser().then((user: any) => {
            if (!user || user.expired) {
                AuthService.signIn();
                return <></>;
            } else {
                return <Navigate to="/signin" replace />;
            }
          });
        case ResolvedContentStatus.AccessDenied: 
            return <Navigate to="/access-denied" replace />;
      }

    const View = lazy(() => import(`@components/pages/${resolveContent.content?.contentType.at(-1)}`));
    return (
        <Suspense fallback={<Loading />}>
            <View {...resolveContent.content} />
        </Suspense>
    );
};

export default PageComponentSelector;

