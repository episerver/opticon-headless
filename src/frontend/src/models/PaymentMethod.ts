export default interface PaymentMethod {
    paymentMethodId: string;
    name: string;
    description: string;
    languageId: string;
    isActive: boolean;
    isDefault: boolean;
    systemKeyword: string;
    ordering: number;
}