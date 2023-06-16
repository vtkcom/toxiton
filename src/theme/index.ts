import { DefaultTheme } from "styled-components";
import { Nullable } from "../vite-env";
import { ThemeParams } from "@twa-dev/types";

const notTheme: Nullable<ThemeParams> = {
  bg_color: "#282828",
  text_color: "#fff",
};

const theme: DefaultTheme = {
  borderRadius: "5px",
  ...notTheme,
  ...window.Telegram.WebApp.themeParams,
};

export { theme };
