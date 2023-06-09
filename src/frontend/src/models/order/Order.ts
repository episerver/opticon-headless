import Payment from "@models/cart/Payment";
import Shipment from "@models/cart/Shipment";
import Total from "../cart/Totals";

export default interface Order {
    name: string;
    orderNumber: string;
    customerId: string;
    market: string;
    currency: string;
    shipments: Shipment[];
    payments: Payment[];
    totals: Total;
    lastUpdated: Date;
    orderDate: Date;
}