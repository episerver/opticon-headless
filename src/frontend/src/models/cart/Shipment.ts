import LineItem from "./LineItem";
import Address from "./Address";

export default interface Shipment {
    id: string;
    shippingAddress: Address;
    shippingMethodId: string;
    lineItems: LineItem[];
}