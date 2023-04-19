import { ContentData } from "@episerver/content-delivery";

export default interface PropertyType{
    value: string | number;
    propertyDataType: string;
    expandedValue: any[];
}