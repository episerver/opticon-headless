import React, { useEffect } from 'react'
import GlobalState from "@models/GlobalState";
import { createContext, useReducer } from "react";
import reducers from "./Reducers";
import qs from 'qs';
import Config from "../config.json";
import { ACTIONS } from './Action';
import { getData, postData, putData } from '../utils/FetchData';
import Cart from '@models/cart/Cart';
import _ from 'lodash';
import CartValidation from '@models/cart/CartValidation';
import LineItem from '@models/cart/LineItem';

export const DataContext = createContext({} as any);

const DataProvider = (props: any) => {
    const initialState = {notify: {}, cart: {}, cartValidation: {}, market: {}, lineItemImages: [] as string[]} as GlobalState;
    const [state, dispatch] = useReducer(reducers, initialState);
    const { cart, market } = state;

    const getAnonymousToken = async () => {
        const res = await fetch(`${Config.BASE_URL}api/episerver/connect/token/anonymous`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify({
                grant_type: "anonymous",
                client_id: "frontend",
                scope: "anonymous_id"
            }),
        })
        const data = await res.json();
        if(!localStorage.getItem("anonymous_access_token")){
            localStorage.setItem("anonymous_access_token", data.access_token);
        }
    }

    const getCart = async () => {
        if(market.marketId){
            const res = await getData(`api/episerver/v3.0/me/carts/Default/${market.marketId}/true`);
            const {lastUpdated, ...rest} = res.data;
            if(!_.isEqual(cart, rest)){
                const cart = rest as Cart;
                dispatch({ 
                    type: ACTIONS.UPDATE_CART,
                    payload: cart
                })
            }
        }
    }

    const updateCart = async () => {
        const res = await putData(`api/episerver/v3.0/me/carts`, cart as Cart);
        if(res.status === 200){
            const {lastUpdated, ...rest} = res.data;
            validateCart();
            if(!_.isEqual(cart, rest)){
                const cart = rest as Cart;
                dispatch({ 
                    type: ACTIONS.UPDATE_CART,
                    payload: cart
                })
            }
        }
    }

    const validateCart = async () => {
        const res = await postData(`api/episerver/v3.0/me/carts/Default/${market.marketId}/preparecheckout`, null);
        if(res.status === 200){
            const validation = res.data as CartValidation;
            dispatch({ 
                type: ACTIONS.UPDATE_CART_VALIDATION,
                payload: validation
            })
        }
    }

    const updateLineItemImages = async () => {
        const promisesArr = [] as Promise<any>[];
        cart.shipments?.[0].lineItems.forEach((lineItem: LineItem) => {
            promisesArr.push(getData(`api/episerver/v3.0/content/${lineItem.contentId}`));
        })
        if(promisesArr.length > 0){
            Promise.all(promisesArr).then(res => {
                dispatch({ 
                    type: ACTIONS.UPDATE_LINE_ITEM_IMAGES,
                    payload: res.map(r => r.data.assets[0] ?? "")
                })
            });
        }
    }

    const getMarket = () => {
        dispatch({ 
            type: ACTIONS.UPDATE_MARKET,
            payload: {
                marketId: localStorage.getItem("marketId"),
                currency: localStorage.getItem("currency"),
                language: localStorage.getItem("language"),
            }
        })
    }

    const persistMarket = () => {
        if(market.marketId){
            localStorage.setItem("marketId", market.marketId);
        }
        if(market.currency){
            localStorage.setItem("currency", market.currency);
        }
        if(market.language){
            localStorage.setItem("language", market.language);
        }
    }

    useEffect(() => {
        getMarket();
        getAnonymousToken();
    }, [])

    useEffect(() => {
        persistMarket();
    }, [market])

    useEffect(() => {
        getCart();
    }, [market.marketId])

    useEffect(() => {
        if(!_.isEmpty(cart)){
            updateCart();
        }
    }, [JSON.stringify(cart)])

    useEffect(() => {
        updateLineItemImages();
    }, [cart.shipments?.[0]?.lineItems.length])

    return(
        <DataContext.Provider value={{state, dispatch}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;