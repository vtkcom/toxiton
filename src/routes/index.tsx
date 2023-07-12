import styled, { ThemeProvider } from "styled-components";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { useStoreon } from "storeon/react";
import { Header } from "../components/header.component";
import { Connect } from "./connect.page";
import { Events, State } from "../store";
import { Main } from "./main.page";
import { useEffect, useMemo } from "react";
import { About } from "./about.page";
import { Profile } from "./profile.page";
import { Wallet } from "./wallet.page";
import {
  Global,
  darkTheme,
  lightTheme,
  baseTheme,
  tonkeeperTheme,
} from "../theme";
import { Map } from "../components/map.component";
import { Sprites } from "../sprites";
import { useSystemTheme } from "../hooks/systemtheme.hook";
import { DefaultTheme } from "styled-components";

const WrapList = styled.div<{ visible: number }>`
  height: 100vh;
  position: relative;
  pointer-events: none;
  z-index: 999;
  transition: background 0.5s ease, backdrop-filter 0.2s ease;
  background: hsl(0deg 0% 0% / ${(p) => (p.visible ? 10 : 50)}%);
  backdrop-filter: blur(${(p) => (p.visible ? 0 : 5)}px);
  will-change: background, backdrop-filter;
`;

const List: React.FC = () => {
  const { map } = useStoreon<State, Events>("map", "connect");
  const [search] = useSearchParams();

  return (
    <WrapList visible={map.visible ? 1 : 0}>
      <Header />
      {search.get("page") === "connect" && search.get("wallet") && <Wallet />}
      {search.get("page") === "connect" && !search.get("wallet") && <Connect />}
      {search.get("page") === "main" && <Main />}
      {search.get("page") === "about" && <About />}
      {search.get("page") === "profile" && <Profile />}
    </WrapList>
  );
};

export const AppRoutes: React.FC = () => {
  const systemTheme = useSystemTheme();
  const { connect } = useStoreon<State, Events>("map", "connect");
  const themeParams = useMemo(getTheme, [connect.embeddedWallet, systemTheme]);
  const [search] = useSearchParams();
  const navigate = useNavigate();

  useEffect(redirect, []);
  useEffect(init, []);

  function getTheme() {
    let theme: DefaultTheme = { ...baseTheme };

    if (systemTheme === "dark") theme = { ...theme, ...darkTheme };
    if (systemTheme === "light") theme = { ...theme, ...lightTheme };
    if (connect.embeddedWallet && connect.embeddedWallet.name === "Tonkeeper")
      theme = { ...theme, ...tonkeeperTheme };

    return { ...theme, ...window.Telegram.WebApp.themeParams };
  }

  function init() {
    if (connect.embeddedWallet !== null) {
    }
  }

  function redirect() {
    if (search.get("page") === null) {
      navigate("?page=main", { replace: true });
    }
  }

  return (
    <ThemeProvider theme={themeParams}>
      <Global />
      <Map />

      <Routes>
        <Route path="*" element={<List />} />
      </Routes>

      <Sprites />
    </ThemeProvider>
  );
};
