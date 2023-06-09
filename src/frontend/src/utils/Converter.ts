import Product from "@models/Product";
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