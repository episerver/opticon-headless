import ShippingTotal from "./ShippingTotal";

export default interface Totals {
    total: number;
    subTotal: number;
    shippingTotal: number;
    handlingTotal: number;
    taxTotal: number;
    discountTotal: number;
    shippingTotals: ShippingTotal[];
    lineItemId: string;
    extendedPrice: number;
    discountedPrice: number;
}