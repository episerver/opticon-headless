import TextValue from "@models/common/TextValue";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Check, Globe } from "react-feather";
import {DisplayMarket, Market} from "@models/Market";
import { Currencies } from "../../constants/Currencies";
import { Languages } from "../../constants/Languages";
import { getData } from "../../utils/FetchData";
import { ACTIONS, addToCart } from "../../store/Action";
import { DataContext } from "../../store/DataProvider";
import _ from 'lodash';
import useMenu from "../../hooks/UseMenu";

const MarketMenu = () => {
    const { state: { market }, dispatch } = useContext(DataContext);
    const [markets, setMarkets] = useState<DisplayMarket[]>([]);
    const {menuId, menuAreaRef, toggleMenu} = useMenu("market-menu");

    const loadMarkets= async () => {
        const res = await getData("api/episerver/v3.0/markets");
        const data = res.data as Market[];
        const markets: DisplayMarket[] = data.map(market => {
            const displayMarket: DisplayMarket = {
                id: market.id,
                name: market.name,
                defaultCurrency: market.defaultCurrency,
                defaultLanguage: market.defaultLanguage,
                currencies: loadCurrencies(market.currencies),
                languages: loadLanguages(market.languages)
            }
            return displayMarket;
        });
        setMarkets(markets);
        const marketId = !!market.marketId && market.marketId !== "undefined" ? market.marketId : markets[0].id;
        const selectedMarket = markets.find(m => m.id === marketId) as DisplayMarket;

        dispatch({ 
            type: ACTIONS.UPDATE_MARKET,
            payload: {
                marketId: marketId,
                currency: resetSelectedCurrency(selectedMarket, false),
                language: resetSelectedLanguage(selectedMarket, false)
            }
        })
    }

    const selectedMarket = (): DisplayMarket => {
       return markets.find(m => m.id === market.marketId) as DisplayMarket;
    }

    const loadCurrencies = (codes: string[]): TextValue[] => {
        const currencies: TextValue[] = codes.map(code => ({
            text: Currencies[code].code,
            value: Currencies[code].symbol_native,
        }))
        return currencies;
    }

    const selectedCurrency = () => {
        return selectedMarket()?.currencies.find(c => c.text === market.currency) as TextValue;
    }

    const resetSelectedCurrency = (displayMarket: DisplayMarket, takeDefaultValue: boolean = false) => {
        let currency = undefined;
        if(takeDefaultValue || !market.currency){
            currency = displayMarket.defaultCurrency;
        }else{
            if(displayMarket.currencies.find(c => market.currency === c.text)){
                currency = market.currency;
            }else{
                currency = displayMarket.defaultCurrency;
            }
        }
        return currency;
    }

    const loadLanguages = (codes: string[]): TextValue[] => {
        const languages: TextValue[] = codes.map(code => ({
            text: Languages[code],
            value: code
        }))
        return languages;
    }

    const selectedLanguage = () => {
        return selectedMarket()?.languages.find(l => l.value === market.language) as TextValue;
    }

    const resetSelectedLanguage = (displayMarket: DisplayMarket, takeDefaultValue: boolean = false) => {
        let language = undefined;
        if(takeDefaultValue || !market.language){
            language = displayMarket.defaultLanguage;
        }else{
            if(displayMarket.languages.find(c => market.language === c.value)){
                language = market.language;
            }else{
                language = displayMarket.defaultLanguage;
            }
        }
        return language;
    }

    const onChangeMarket = (market: DisplayMarket) => {
        dispatch({ 
            type: ACTIONS.UPDATE_MARKET,
            payload: { 
                marketId: market.id,
                currency: resetSelectedCurrency(market, true),
                language: resetSelectedLanguage(market, true)
            }
        })
    }

    const onChangeCurrency = (currency: TextValue) => {
        dispatch({ 
            type: ACTIONS.UPDATE_MARKET,
            payload: {...market, currency: currency.text}
        })
    }

    const onChangeLanguage = (language: TextValue) => {
        dispatch({ 
            type: ACTIONS.UPDATE_MARKET,
            payload: {...market, language: language.value}
        })
    }

    useEffect(() => {
        if(!_.isEmpty(market)){
            loadMarkets();
        }
    }, [_.isEmpty(market)])

    return (
        <div ref={menuAreaRef}>
            <button 
                className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white"
                onClick={toggleMenu}
            >
                <Globe className="h-4 w-4"/>
            </button>
            <div 
                id={menuId}
                className="opacity-0 hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
                onClick={toggleMenu}
            >
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border-2 border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                    <div className="dark:text-black">
                        <p className="font-bold text-md bg-slate-200 p-1 pl-2">Market: {selectedMarket()?.name}</p>
                        <div className="overflow-auto max-h-52 p-1 pl-2">
                            {
                                markets.map((m) => (<div key={m.id} className="flex justify-between hover:bg-slate-50 p-1" onClick={() => onChangeMarket(m)}>
                                    <span className={selectedMarket()?.id === m.id ? "font-bold text-indigo-600" : ""}>{m.name}</span>
                                    {selectedMarket()?.id === m.id && <Check className="w-5 h-5 text-indigo-600"/>}
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="dark:text-black">
                        <p className="font-bold text-md bg-slate-200 p-1 pl-2">Currency: {selectedCurrency()?.value}</p>
                        <div className="overflow-auto max-h-52 p-1">
                            {
                                selectedMarket()?.currencies.map((c) => (<div key={c.text} className="flex justify-between hover:bg-slate-50 p-1" onClick={() => onChangeCurrency(c)}>
                                    <span className={selectedCurrency()?.text === c.text ? "font-bold text-indigo-600" : ""}>{c.text}</span>
                                    {selectedCurrency()?.text === c.text && <Check className="w-5 h-5 text-indigo-600"/>}
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="dark:text-black">
                        <p className="font-bold text-md bg-slate-200 p-1 pl-2">Language: {selectedLanguage()?.value}</p>
                        <div className="overflow-auto max-h-52 p-1">
                            {
                                selectedMarket()?.languages.map((l) => (<div key={l.text} className="flex justify-between hover:bg-slate-50 p-1" onClick={() => onChangeLanguage(l)}>
                                    <span className={selectedLanguage()?.text === l.text ? "font-bold text-indigo-600" : ""}>{l.text}</span>
                                    {selectedLanguage()?.text === l.text && <Check className="w-5 h-5 text-indigo-600"/>}
                                </div>))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
   )
}

export default MarketMenu;