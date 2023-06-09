import Product from "@models/Product";
import Cart from "@models/cart/Cart";
import { convertToLineItem } from "../utils/Converter";
import LineItem from "@models/cart/LineItem";
import _ from 'lodash';

export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    UPDATE_MARKET: 'UPDATE_MARKET',
    UPDATE_CART: 'UPDATE_CART',
    UPDATE_CART_VALIDATION: 'UPDATE_CART_VALIDATION'
}

export const addToCart = (product: Product, cart: Cart) => {
    const newCart = _.cloneDeep(cart) as Cart;
    const lineItems = newCart.shipments[0].lineItems;

    const check = lineItems.every(item => item.contentId !== product.contentLink.guidValue) ?? true;
    if(!check) return ({ type: 'NOTIFY', payload: {error: 'The food has been added to cart.'} });

    const newLineItem = convertToLineItem(product);
    newCart.shipments[0].lineItems = [...lineItems, newLineItem];
    
    return { type: 'UPDATE_CART', payload: newCart};
}

export const updateQuantity = (contentId: string, cart: Cart, quantity: number) => {
    const newCart = _.cloneDeep(cart) as Cart;
    const lineItems = newCart.shipments[0].lineItems;

    lineItems.forEach(item => {
        if(item.contentId === contentId) item.quantity = quantity;
    })

    return { type: 'UPDATE_CART', payload: newCart };
}

export const deleteItem = (contentId: string, cart: Cart) => {
    const newCart = _.cloneDeep(cart) as Cart;
    const lineItems = newCart.shipments[0].lineItems;

    newCart.shipments[0].lineItems = lineItems.filter(item => item.contentId !== contentId);

    return { type: 'UPDATE_CART', payload: newCart};
}

export const updateItem = (lineItem: LineItem, cart: Cart) => {
    const newCart = _.cloneDeep(cart) as Cart;
    const lineItems = newCart.shipments[0].lineItems;

    newCart.shipments[0].lineItems = lineItems.map(item => (item.contentId === lineItem.contentId ? lineItem : item));

    return { type: 'UPDATE_CART', payload: newCart};
}