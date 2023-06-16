import { DefaultTheme } from "styled-components";
import { ThemeParams } from "@twa-dev/types";
import { opacify } from "polished";

const notTheme: ThemeParams = {
  bg_color: "#212121",
  button_color: "#8774e1",
  button_text_color: "#ffffff",
  hint_color: "#aaaaaa",
  link_color: "#8774e1",
  secondary_bg_color: "#0f0f0f",
  text_color: "#ffffff",
};

const theme: DefaultTheme = {
  borderRadius: "5px",
  ...notTheme,
  ...window.Telegram.WebApp.themeParams,
};

theme.bg_color_50 = opacify(-0.5, theme.bg_color);

export { theme };
