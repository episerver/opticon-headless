import Payment from "./Payment";
import Shipment from "./Shipment";

export default interface Cart {
    id: number;
    name: string;
    customerId: string;
    market: string;
    currency: string;
    lastUpdated: Date;
    shipments: Shipment[];
    payments: Payment[];
    couponCodes: string[];
}