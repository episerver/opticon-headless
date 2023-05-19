import { ContentData } from "@episerver/content-delivery";
import { PageImage } from "@models/common/PageImage";

export default interface BlogItem extends ContentData {
    author?: string;
    metaDescription?: string;
    mainBody?: string;
    minsToRead?: number;
    pageImage?: PageImage;
    url: string;
}
