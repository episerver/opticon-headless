import { ContentData } from "@episerver/content-delivery";
import { ContentAreaItem } from "./ContentAreaItem";

export interface ContentArea {
    propertyDataType: string;
    value: ContentAreaItem[];
    expandedValue: ContentData[];
};