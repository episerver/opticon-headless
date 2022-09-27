import { ContentData, ContentLink } from "@episerver/content-delivery"

export interface ContentAreaItem {
    contentLink: ContentLink
    displayOption: string
    tag: string
    expandedValue?: ContentData
}