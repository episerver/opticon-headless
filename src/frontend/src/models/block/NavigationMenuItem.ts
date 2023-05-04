import { ContentData } from "@episerver/content-delivery";

export default interface NavigationMenuItem extends ContentData{
    text: string;
    link: string;
}