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
import { Global, theme, tonkeeperTheme } from "../theme";
import { Map } from "../components/map.component";
import { Sprites } from "../sprites";

const WrapOrder = styled.div<{ visible: number }>`
  position: relative;
  pointer-events: none;
  z-index: 999;
  /* overflow: hidden; */
  /* height: 100%; */
  transition: background 0.5s ease, backdrop-filter 0.2s ease;
  background: hsl(0deg 0% 0% / ${(p) => (p.visible ? 10 : 50)}%);
  backdrop-filter: blur(${(p) => (p.visible ? 0 : 5)}px);
  will-change: background, backdrop-filter;
`;

const List: React.FC = () => {
  const { map } = useStoreon<State, Events>("map", "connect");
  const [search] = useSearchParams();

  return (
    <WrapOrder visible={map.visible ? 1 : 0}>
      <Header />
      {search.get("page") === "connect" && search.get("wallet") && <Wallet />}
      {search.get("page") === "connect" && <Connect />}
      {search.get("page") === "main" && <Main />}
      {search.get("page") === "about" && <About />}
      {search.get("page") === "profile" && <Profile />}
    </WrapOrder>
  );
};

export const AppRoutes: React.FC = () => {
  const { connect } = useStoreon<State, Events>("map", "connect");
  const themeParams = useMemo(
    () =>
      connect.embeddedWallet ? { ...theme, ...tonkeeperTheme } : { ...theme },
    [connect.embeddedWallet]
  );
  const [search] = useSearchParams();
  const navigate = useNavigate();

  useEffect(redirect, []);
  useEffect(init, []);

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
