import LineItemPrice from "./LineItemPrice";

export default interface ShippingTotal {
    shipmentId: string;
    shippingCost: number;
    shippingTax: number;
    itemsTotal: number;
    lineItemPrices: LineItemPrice[];
}