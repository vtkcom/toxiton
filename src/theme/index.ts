import { DefaultTheme, createGlobalStyle } from "styled-components";
import { ThemeParams } from "@twa-dev/types";
import { opacify } from "polished";

// const defaultTheme: ThemeParams = {
//   bg_color: "#212121",
//   button_color: "#8774e1",
//   button_text_color: "#ffffff",
//   hint_color: "#aaaaaa",
//   link_color: "#8774e1",
//   secondary_bg_color: "#0f0f0f",
//   text_color: "#ffffff",
// };

const lightTheme: ThemeParams = {
  bg_color: "#ffffff",
  button_color: "#3390ec",
  button_text_color: "#ffffff",
  hint_color: "#707579",
  link_color: "#3390ec",
  secondary_bg_color: "#f4f4f5",
  text_color: "#000000",
};

const theme: DefaultTheme = {
  border_radius: "2rem",
  ...lightTheme,
  ...window.Telegram.WebApp.themeParams,
};

theme.bg_color_90 = opacify(-0.1, theme.bg_color);
theme.bg_color_70 = opacify(-0.3, theme.bg_color);
theme.bg_color_50 = opacify(-0.5, theme.bg_color);
theme.bg_color_20 = opacify(-0.8, theme.bg_color);
theme.bg_color_10 = opacify(-0.9, theme.bg_color);
theme.box_shadow = `0 0.5rem 1.5rem rgba(0, 0, 0, 0.5);`;

const Global = createGlobalStyle`
    :root {
        font-family: 'Roboto', sans-serif;
        /* font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; */
        line-height: 1.5;
        font-weight: 400;
        font-size: 18px;

        color-scheme: light dark;
        color: ${(p) => p.theme.text_color};
        background-color: #242424;
        user-select: none;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        user-select: none;
    }

    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    a, .leaflet-container a {
        font-weight: 500;
        color: ${(p) => p.theme.link_color};
        text-decoration: inherit;
        outline: none;
    }
    a:hover {
        color: ${(p) => p.theme.link_color};
    }

    html {
        width: 100%;
        height: 100%;
        /* height: ${() => window.Telegram.WebApp.viewportStableHeight}px; */
        overscroll-behavior: none;
        display: grid;
    }

    body {
        margin: 0;
        display: grid;
        /* place-items: center; */
        /* width: 100vw; */
        /* height: ${() => window.Telegram.WebApp.viewportStableHeight}px; */
        overscroll-behavior: none;
    }

    app {
        position: relative;
        display: grid;
        /* width: 100vw; */
        /* height: 100%; */
        overscroll-behavior: none;
    }

    .leaflet-control-attribution {
        padding: 0.4rem 1rem;
        background-color: ${(p) => p.theme.secondary_bg_color} !important;
        color: ${(p) => p.theme.hint_color} !important;
        box-shadow: none !important;
        left: 0;
        right: 0;
        bottom: -1px;
        position: fixed;
        z-index: 10000;
        display: none !important;
        a {
            color: ${(p) => p.theme.link_color} !important;
        }
    }

    .leaflet-container {
        width: 100%;
        height: 74vh;
    }

    .avatar {
        /* box-shadow: ${(p) => p.theme.box_shadow}; */
        /* border-radius: 50%; */
        pointer-events: visiblePainted;
        user-select: none;
        /* background: linear-gradient(#ffffff -125%, rgb(51 144 236)); */
        display: grid;
        place-items: center;
        img {
            filter: drop-shadow(0.1rem 0.1rem 0.7rem hsla(0, 0%, 0%, 0.8));
            border-radius: 0 0 50% 50%;
            transition: transform 0.3s ease;
            transform: scale(1);
            &:active {
                transform: scale(1.3);
            }
        }
        
    }

    svg {
        stroke: currentColor;
        stroke-width: 2;
        stroke-linejoin: round;
        stroke-linecap: round;
        fill: none;
    }
`;

export { theme, Global };
