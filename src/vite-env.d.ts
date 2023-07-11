/// <reference types="vite/client" />
import { Telegram, ThemeParams } from "@twa-dev/types";
import "styled-components";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

declare module "styled-components" {
  export interface DefaultTheme extends ThemeParams {
    border_radius?: `${number}rem`;
    box_shadow?: string;
    bg_color_90?: string;
    bg_color_70?: string;
    bg_color_50?: string;
    bg_color_20?: string;
    bg_color_10?: string;
  }
}

declare interface Place {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: Address;
}

declare interface Address {
  house_number: string;
  road: string;
  quarter: string;
  neighbourhood?: string;
  suburb: string;
  city_district?: string;
  city: string;
  county: string;
  state: string;
  "ISO3166-2-lvl4": string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
}
