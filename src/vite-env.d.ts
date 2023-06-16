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
    borderRadius: `${number}px`;
    bg_color_50?: string;
  }
}
