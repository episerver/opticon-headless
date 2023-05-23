import React, { useEffect } from 'react'
import GlobalState from "@models/GlobalState";
import { createContext, useReducer } from "react";
import reducers from "./Reducers";
import qs from 'qs';
import Config from "../config.json";
import { ACTIONS } from './Action';
import { getData } from '../utils/FetchData';
import Cart from '@models/cart/Cart';

export const DataContext = createContext({} as any);

const DataProvider = (props: any) => {
    const initialState = {notify: {}, cart: {}, market: {}} as GlobalState;

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
            const cart = res.data as Cart;
            dispatch({ 
                type: ACTIONS.UPDATE_CART,
                payload: cart
            })
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

    const persistentMarket = () => {
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
        persistentMarket();
    }, [market])

    useEffect(() => {
        getCart();
    }, [market.marketId])

    return(
        <DataContext.Provider value={{state, dispatch}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;