import { ContentData, ContentLink } from "@episerver/content-delivery"

export default interface ContentAreaItem {
    contentLink: ContentLink
    displayOption: string
    tag: string
    content: ContentData;
}