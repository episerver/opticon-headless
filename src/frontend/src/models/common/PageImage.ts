import { ContentData } from "@episerver/content-delivery";

export interface PageImage {
    id: string;
    guidValue: string;
    url: string;
    expanded: ContentData;
}
