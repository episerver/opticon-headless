import { ContentData } from "@episerver/content-delivery";

export default interface Product extends ContentData {
    code: string;
    price: number;
    displayName: string;
}