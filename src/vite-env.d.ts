/// <reference types="vite/client" />
import { Telegram, ThemeParams } from "@twa-dev/types";
import "styled-components";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

interface Nullable<T> {
  [key: keyof T]: typeof T | null;
}

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends Nullable<ThemeParams> {
    borderRadius: string;
  }
}
