export interface Currency {
    symbol: string,
    name_plural: string,
    code: string,
    symbol_native: string,
    decimal_digits: number,
    name: string;
    rounding: number;
}

export default interface ListCurrencies {
  [key: string]: Currency;
}