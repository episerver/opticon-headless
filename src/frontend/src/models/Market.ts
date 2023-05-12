import TextValue from "./common/TextValue";

export interface Market {
    countries: string[];
    currencies: string[];
    languages: string[];
    defaultCurrency: string;
    defaultLanguage: string;
    id: string;
    name: string;
}

export interface DisplayMarket {
    id: string;
    name: string;
    defaultCurrency: string;
    defaultLanguage: string;
    currencies: TextValue[];
    languages: TextValue[];
}