import Address from "./Address";

export interface ExtendedProperty {
    name: string;
    value: string;
}

export default interface Payment {
    amount: number;
    authorizationCode: string;
    billingAddress: Address;
    savedBillingAddressName: string;
    customerName: string;
    paymentId: string;
    systemKeyword: string;
    paymentType: string;
    providerTransactionID: string;
    status: string;
    transactionID: string;
    transactionType: string;
    validationCode: string;
    extendedProperties: ExtendedProperty[];
}