import { DefaultTheme, createGlobalStyle, keyframes } from "styled-components";
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
  border_radius: "5px",
  ...notTheme,
  ...window.Telegram.WebApp.themeParams,
};

theme.bg_color_50 = opacify(-0.5, theme.bg_color);
theme.bg_color_20 = opacify(-0.8, theme.bg_color);
theme.bg_color_10 = opacify(-0.9, theme.bg_color);
theme.box_shadow = `0 0 1rem -0.3rem ${theme.bg_color_50}`;

const scale = keyframes`
    0% {
        box-shadow: 0 0 20px -12px hsla(0, 0%, 0%, 0.4);
    }
    50% {
        box-shadow: 0 0 30px -12px hsla(0, 0%, 0%, 0.4),
        0 0 40px -12px hsla(0, 0%, 0%, 0.4), 0 0 60px -12px hsla(0, 0%, 0%, 0.4),
        0 0 80px -12px hsla(0, 0%, 0%, 0.4);
    }
    100% {
        box-shadow: 0 0 20px -12px hsla(0, 0%, 0%, 0.4);
    }
`;

const Global = createGlobalStyle`
    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
        font-size: 16px;

        color-scheme: light dark;
        color: hsl(0deg 0% 30% / 87%);
        background-color: #242424;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
    }
    a:hover {
        color: #535bf2;
    }

    body {
        margin: 0;
        display: flex;
        place-items: center;
        width: 100vw;
        height: 100vh;
    }

    app {
        position: relative;
        width: 100vw;
        height: 100vh;
    }

    .leaflet-control-attribution {
        text-align: center;
        padding: 5px 0;
        background-color: ${(p) => p.theme.bg_color_50} !important;
        color: ${(p) => p.theme.text_color} !important;
        backdrop-filter: blur(5px);
        box-shadow: ${(p) => p.theme.box_shadow} !important;
        left: 0;
        right: 0;
        bottom: -1px;
        position: fixed;
        z-index: 1001;
        a {
            color: ${(p) => p.theme.text_color} !important;
        }
    }

    .leaflet-tile-container {
        filter: grayscale(1);
    }

    .leaflet-container {
        width: 100vw;
        height: 100vh;
    }

    
    .avatar {
        /* filter: drop-shadow(0 0 5px hsla(0, 0%, 0%, 0.2)); */
        box-shadow: 0 0 20px -12px hsla(0, 0%, 0%, 0.4);
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 4px solid hsl(0, 0%, 100%);
        img {
            position: relative;
            border-radius: 50%;
            z-index: 1001;
        }
    }

    .avatar.animate {
        animation: 0.5s ease-in infinite ${scale};
    }

    
`;

export { theme, Global };
