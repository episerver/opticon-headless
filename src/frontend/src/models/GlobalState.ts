import Notify from "./Notify";
import Cart from "./cart/Cart";

export interface MarketInfo {
    marketId: string;
    currency: string;
    language: string;
}

export interface Modal {
    show: boolean;
}

export default interface GlobalState {
    notify: Notify;
    cart: Cart;
    market: MarketInfo;
    modal: Modal;
}