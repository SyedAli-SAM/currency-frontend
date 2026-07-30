export interface CurrencySymbols { [code: string]: { description: string; code: string }; }

export interface ConvertResponse {
  base: string; target: string; amount: number;
  rate: number; result: number; date: string;
}

export interface ConversionRecord extends ConvertResponse {
  timestamp: string; // ISO, when the conversion was performed
}