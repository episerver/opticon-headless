import Notify from "./Notify";
import Cart from "./cart/Cart";
import CartValidation from "./cart/CartValidation";

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
    cartValidation: CartValidation;
    market: MarketInfo;
    modal: Modal;
}