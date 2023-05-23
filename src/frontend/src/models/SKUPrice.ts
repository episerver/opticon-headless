export interface DiscountedPrice {
    description: string;
    discountedPrice: number;
    defaultPrice: number;
}

export interface Price {
    price: number;
    priceType: string;
    priceCode: string;
    validFrom: Date;
    validUntil: Date;
    minQuantity: number;
}

export default interface SKUPrice {
    entryCode: string;
    prices: Price[];
    discountedPrices: DiscountedPrice[];
}