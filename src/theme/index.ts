import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
    borderRadius: "5px",
    ...window.Telegram.WebApp.themeParams,
};

export { theme };
