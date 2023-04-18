import { ContentData } from "@episerver/content-delivery";

export interface BlogItem extends ContentData{
   author?: string;
   metaDescription?: string;
   mainBody?: string;
   minsToRead?: number;
   url: string;
}