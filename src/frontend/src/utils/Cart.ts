import Product from "@models/Product";
import Cart from "@models/cart/Cart";
import LineItem from "@models/cart/LineItem";

export const convertToLineItem = (product: Product): LineItem => {
   const lineItem = {
    contentId: product.contentLink.guidValue,
    code: product.code,
    placedPrice: product.price,
    quantity: 1,
    displayName: product.displayName,
    isGift: false
   }
   return lineItem;
}

export const isEmptyCart = (cart: Cart) => {
   return !(!cart.shipments || cart.shipments && cart.shipments[0].lineItems.length > 0);
}