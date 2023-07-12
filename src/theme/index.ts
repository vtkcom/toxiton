import { DefaultTheme, createGlobalStyle } from "styled-components";
import { opacify } from "polished";

export const darkTheme: DefaultTheme = {
  bg_color: "#212121",
  button_color: "#8774e1",
  button_text_color: "#ffffff",
  hint_color: "#aaaaaa",
  link_color: "#8774e1",
  secondary_bg_color: "#0f0f0f",
  text_color: "#ffffff",
  bg_color_90: opacify(-0.1, "#212121"),
  bg_color_70: opacify(-0.3, "#212121"),
  bg_color_50: opacify(-0.5, "#212121"),
  bg_color_20: opacify(-0.8, "#212121"),
  bg_color_10: opacify(-0.9, "#212121"),
};

export const lightTheme: DefaultTheme = {
  bg_color: "#ffffff",
  button_color: "#3390ec",
  button_text_color: "#ffffff",
  hint_color: "#707579",
  link_color: "#3390ec",
  secondary_bg_color: "#f4f4f5",
  text_color: "#000000",
  bg_color_90: opacify(-0.1, "#ffffff"),
  bg_color_70: opacify(-0.3, "#ffffff"),
  bg_color_50: opacify(-0.5, "#ffffff"),
  bg_color_20: opacify(-0.8, "#ffffff"),
  bg_color_10: opacify(-0.9, "#ffffff"),
};

export const tonkeeperTheme: DefaultTheme = {
  bg_color: "#10161F",
  button_color: "#3390ec",
  button_text_color: "#ffffff",
  hint_color: "#556170",
  link_color: "#45AEF5",
  secondary_bg_color: "#1D2633",
  text_color: "#FFFFFF",
  bg_color_90: opacify(-0.1, "#10161F"),
  bg_color_70: opacify(-0.3, "#10161F"),
  bg_color_50: opacify(-0.5, "#10161F"),
  bg_color_20: opacify(-0.8, "#10161F"),
  bg_color_10: opacify(-0.9, "#10161F"),
};

export const baseTheme: DefaultTheme = {
  border_radius: "2rem",
  box_shadow: "0 0.5rem 1.5rem rgba(0, 0, 0, 0.5)",
};

export const Global = createGlobalStyle`
    :root {
        font-family: 'Roboto', sans-serif;
        /* font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; */
        line-height: 1.5;
        font-weight: 400;
        font-size: 18px;

        color-scheme: light dark;
        color: ${(p) => p.theme.text_color};
        background-color: ${(p) => p.theme.bg_color};
        user-select: none;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        user-select: none;
        
        @media (min-height: 400px) and (max-height: 500px) {
            font-size: 14px;
        }
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
        overscroll-behavior: none;
    }

    body {
        margin: 0;
        display: grid;
        overscroll-behavior: none;
    }
    
    app {
        display: grid;
        height: 100%;
        width: 100vw;
        overscroll-behavior: none;
        overflow: hidden;
    }

    .leaflet-control-attribution {
        display: none !important;
        a {
            color: ${(p) => p.theme.link_color} !important;
        }
    }

    .leaflet-container {
        width: 100%;
        height: calc(100vh - 12rem);
        position: absolute;
        top: 0;
        @media (min-height: 400px) and (max-height: 500px) {
            height: calc(100% - 11rem);
        }
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
