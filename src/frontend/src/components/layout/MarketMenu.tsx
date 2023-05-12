import TextValue from "@models/common/TextValue";
import React, { useEffect, useRef, useState } from "react";
import { Check, Globe } from "react-feather";
import axios from "axios";
import Config from "../../config.json";
import {DisplayMarket, Market} from "@models/Market";
import { Currencies } from "../../constants/Currencies";
import { Languages } from "../../constants/Languages";

const MarketMenu = () => {
    const ref = useRef<any>(null);
    const [markets, setMarkets] = useState<DisplayMarket[]>([]);
    const [selectedMarket, setSelectedMarket] = useState<DisplayMarket>();
    const [selectedCurrency, setSelectedCurrency] = useState<TextValue>();
    const [selectedLanguage, setSelectedLanguage] = useState<TextValue>();
    
    const handleClickOutSide = (event: any) => {
        const { target } = event;
        if (ref.current && !ref.current.contains(target)) {
            const el = document.getElementById("market-menu");
            if(el && !el.className.includes("hidden")){
                el.classList.add("hidden");
            }
        }
    }

    const toggleMenu = () => {
        const el = document.getElementById("market-menu");
        if(el){
            if(el.className.includes("hidden")){
                el.classList.remove("hidden");
            }else{
                el.classList.add("hidden");
            }
        }
    }

    const loadMarkets= async () => {
        const res = await axios({
            url: "/api/episerver/v3.0/markets",
            method: "get",
            baseURL: Config.BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
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
        const currentMarket = localStorage.getItem("market");

        if(currentMarket){
            setSelectedMarket(markets.find(market => market.id === currentMarket));
        }else{
            setSelectedMarket(markets[0]);
            localStorage.setItem("market", markets[0].id);
        } 
        resetSelectedLanguage(markets[0], false);
        resetSelectedCurrency(markets[0], false);
    }

    const loadCurrencies = (codes: string[]): TextValue[] => {
        const currencies: TextValue[] = codes.map(code => ({
            text: Currencies[code].code,
            value: Currencies[code].symbol_native,
        }))
        return currencies;
    }

    const resetSelectedCurrency = (market: DisplayMarket, takeDefaultValue: boolean = false) => {
        const currentCurrency = localStorage.getItem("currency");
        if(takeDefaultValue || !currentCurrency){
            setSelectedCurrency(market.currencies.find(currency => currency.text === market.defaultCurrency));
            localStorage.setItem("currency", market.defaultCurrency); 
        }else{
            const currency = market.currencies.find(currency => currency.text === currentCurrency);
            setSelectedCurrency(currency);
            if(!currency){
                localStorage.removeItem("language");
            }
        }
    }

    const loadLanguages = (codes: string[]): TextValue[] => {
        const languages: TextValue[] = codes.map(code => ({
            text: Languages[code],
            value: code
        }))
        return languages;
    }

    const resetSelectedLanguage = (market: DisplayMarket, takeDefaultValue: boolean = false) => {
        const currentLanguage = localStorage.getItem("language");
        if(takeDefaultValue || !currentLanguage){
            setSelectedLanguage(market.languages.find(language => language.value === market.defaultLanguage));
            localStorage.setItem("language", market.defaultLanguage);
        }else{
            const language = market.languages.find(language => language.value === currentLanguage);
            setSelectedLanguage(language);
            if(!language){
                localStorage.removeItem("language");
            }
        }
    }

    const onChangeMarket = (market: DisplayMarket) => {
        setSelectedMarket(market);
        resetSelectedLanguage(market, true);
        resetSelectedCurrency(market, true);
        localStorage.setItem("market", market.id);
    }

    const onChangeCurrency = (currency: TextValue) => {
        setSelectedCurrency(currency);
        localStorage.setItem("currency", currency.value);
    }

    const onChangeLanguage = (language: TextValue) => {
        setSelectedLanguage(language);
        localStorage.setItem("language", language.value);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide)
        return () => document.removeEventListener('click', handleClickOutSide)
    }, [])

    useEffect(() => {
        loadMarkets();
    }, [])

    return (
        <div ref={ref}>
            <button 
                className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white"
                onClick={toggleMenu}
            >
                <Globe className="h-4 w-4"/>
            </button>
            <div 
                id="market-menu" 
                className="opacity-0 hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
                onClick={toggleMenu}
            >
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border-2 border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                    <div className="dark:text-black">
                        <p className="font-bold text-md bg-slate-200 p-1 pl-2">Market: {selectedMarket?.name}</p>
                        <div className="overflow-auto max-h-52 p-1 pl-2">
                            {
                                markets.map((market) => (<div key={market.id} className="flex justify-between hover:bg-slate-50 p-1" onClick={() => onChangeMarket(market)}>
                                    <span className={selectedMarket?.id === market.id ? "font-bold text-indigo-600" : ""}>{market.name}</span>
                                    {selectedMarket?.id === market.id && <Check className="w-5 h-5 text-indigo-600"/>}
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="dark:text-black">
                        <p className="font-bold text-md bg-slate-200 p-1 pl-2">Currency: {selectedCurrency?.value}</p>
                        <div className="overflow-auto max-h-52 p-1">
                            {
                                selectedMarket?.currencies.map((currency) => (<div key={currency.text} className="flex justify-between hover:bg-slate-50 p-1" onClick={() => onChangeCurrency(currency)}>
                                    <span className={selectedCurrency?.text === currency.text ? "font-bold text-indigo-600" : ""}>{currency.text}</span>
                                    {selectedCurrency?.text === currency.text && <Check className="w-5 h-5 text-indigo-600"/>}
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="dark:text-black">
                        <p className="font-bold text-md bg-slate-200 p-1 pl-2">Language: {selectedLanguage?.value}</p>
                        <div className="overflow-auto max-h-52 p-1">
                            {
                                selectedMarket?.languages.map((language) => (<div key={language.text} className="flex justify-between hover:bg-slate-50 p-1" onClick={() => onChangeLanguage(language)}>
                                    <span className={selectedLanguage?.text === language.text ? "font-bold text-indigo-600" : ""}>{language.text}</span>
                                    {selectedLanguage?.text === language.text && <Check className="w-5 h-5 text-indigo-600"/>}
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