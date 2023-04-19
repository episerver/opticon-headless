import { ContentData } from "@episerver/content-delivery";

interface PageImage{
   id: string;
   guidValue: string;
   url: string;
   expanded: ContentData;  
}

export default interface BlogItem extends ContentData{
   author?: string;
   metaDescription?: string;
   mainBody?: string;
   minsToRead?: number;
   pageImage?: PageImage;
   url: string;
}