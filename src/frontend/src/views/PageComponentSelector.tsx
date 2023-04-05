import { ContentData } from "@episerver/content-delivery";
import { getContentResolver } from "../DefaultContext";
import React, { lazy, Suspense } from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import Loading from "@components/common/Loading";

export const PageDataLoader = async ({ request }: any): Promise<ContentData | null> => {
    const url = new URL(request.url);
    const context = getContentResolver();
    const content = await context.resolveContent(url.pathname, true);
    return content.content ?? null;
};

const PageComponentSelector = () => {
    const content = useLoaderData() as ContentData;
    if (content === null) {
        return <Navigate to="/error" replace />;
    }

    const View = lazy(() => import(`@components/pages/${content.contentType.at(-1)}`));
    return (
        <Suspense fallback={<Loading />}>
            <View {...content} />
        </Suspense>
    );
};

export default PageComponentSelector;

