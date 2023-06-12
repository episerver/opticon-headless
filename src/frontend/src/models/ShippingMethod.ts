export default interface ShippingMethod {
    shippingMethodId: string;
    name: string;
    displayName: string;
    description: string;
    basePrice: number;
    currencyId: string;
    languageId: string;
    isActive: boolean;
    isDefault: boolean;
}