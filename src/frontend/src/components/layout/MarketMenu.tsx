import TextValue from "@models/common/TextValue";
import React, { useEffect, useRef, useState } from "react";
import { Check, Globe } from "react-feather";
import { MarketIcons } from "../../constants/MarketIcons";
import axios from "axios";
import Config from "../../config.json";

const MarketMenu = () => {
    const ref = useRef<any>(null);
    const [markets, setMarkets] = useState<TextValue[]>([]);
    const [currencies, setCurrencies] = useState<TextValue[]>([]);
    const [languages, setLanguages] = useState<TextValue[]>([]);
    const [selectedMarket, setSelectedMarket] = useState<TextValue>();
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
        const markets: TextValue[] = [
            {text: "Australia", value: "australia"},
            {text: "Brazil", value: "brazil"},
            {text: "Canada", value: "canada"},
        ]
        setMarkets(markets);
        const currentMarket = localStorage.getItem("market");
        if(currentMarket){
            setSelectedMarket(JSON.parse(currentMarket ?? ""));
        }else{
            setSelectedMarket(markets[0]);
            localStorage.setItem("market", JSON.stringify(markets[0]));
        } 
    }

    const loadCurrencies = () => {
        const currencies: TextValue[] = [
            {text: "CAD - $", value: "$"},
        ]
        setCurrencies(currencies);
        const currentCurrency = localStorage.getItem("currency");
        if(currentCurrency){
            setSelectedCurrency(JSON.parse(currentCurrency ?? ""));
        }else{
            setSelectedCurrency(currencies[0]);
            localStorage.setItem("currency", JSON.stringify(currencies[0]));
        } 
    }

    const loadLanguages = () => {
        const languages: TextValue[] = [
            {text: "English", value: "en"},
        ]
        setLanguages(languages);
        const currentLanguage = localStorage.getItem("language");
        if(currentLanguage){
            setSelectedLanguage(JSON.parse(currentLanguage ?? ""));
        }else{
            setSelectedLanguage(languages[0]);
            localStorage.setItem("language", JSON.stringify(languages[0]));
        } 
    }

    const onChangeMarket = (market: TextValue) => {
        setSelectedMarket(market);
        localStorage.setItem("market", JSON.stringify(market));
    }

    const onChangeCurrency = (currency: TextValue) => {
        setSelectedMarket(currency);
        localStorage.setItem("currency", JSON.stringify(currency));
    }

    const onChangeLanguage = (language: TextValue) => {
        setSelectedLanguage(language);
        localStorage.setItem("language", JSON.stringify(language));
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide)
        return () => document.removeEventListener('click', handleClickOutSide)
    }, [])

    useEffect(() => {
        loadMarkets();
    }, [])

    useEffect(() => {
        loadCurrencies();
        loadLanguages();
    }, [selectedMarket])

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
                        <p className="font-bold text-md bg-slate-200 p-1 pl-2">Market: {selectedMarket?.text}</p>
                        <div className="overflow-auto max-h-52 p-1 pl-2">
                            {
                                markets.map((market) => (<div key={market.value} className="flex justify-between p-1" onClick={() => onChangeMarket(market)}>
                                    <div className="flex space-x-2">
                                        <img src={MarketIcons[market.value]} className="w-4 h-4"/>
                                        <span>{market.text}</span>
                                    </div>
                                    {selectedMarket?.value === market.value && <Check className="w-5 h-5"/>}
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="dark:text-black">
                        <p className="font-bold text-md bg-slate-200 p-1 pl-2">Currency: {selectedCurrency?.value}</p>
                        <div className="overflow-auto max-h-52 p-1">
                            {
                                currencies.map((currency) => (<div key={currency.value} className="flex justify-between p-1" onClick={() => onChangeCurrency(currency)}>
                                    <div className="flex space-x-2">
                                        <span>{currency.text}</span>
                                    </div>
                                    {selectedCurrency?.value === currency.value && <Check className="w-5 h-5"/>}
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="dark:text-black">
                        <p className="font-bold text-md bg-slate-200 p-1 pl-2">Language: {selectedLanguage?.value}</p>
                        <div className="overflow-auto max-h-52 p-1">
                            {
                                languages.map((language) => (<div key={language.value} className="flex justify-between p-1" onClick={() => onChangeLanguage(language)}>
                                    <div className="flex space-x-2">
                                        <span>{language.text}</span>
                                    </div>
                                    {selectedLanguage?.value === language.value && <Check className="w-5 h-5"/>}
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