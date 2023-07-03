import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStoreon } from "storeon/react";
import { Header } from "../components/header.component";
import { Connect } from "./connect.page";
import { Events, State } from "../store";
import { Main } from "./main.page";
import { useEffect } from "react";

const WrapOrder = styled.div<{ visible: number }>`
  position: absolute;
  top: 0;
  /* left: 0; */
  bottom: 0;
  /* right: 0; */
  width: 100%;
  /* height: fit-content; */
  /* height: 100%; */
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
  transition: background 0.5s ease, backdrop-filter 0.2s ease;
  background: hsl(0deg 0% 0% / ${(p) => (p.visible ? 10 : 50)}%);
  backdrop-filter: blur(${(p) => (p.visible ? 0 : 5)}px);
  will-change: background, backdrop-filter;
`;

export const Pages: React.FC = () => {
  const { map } = useStoreon<State, Events>("map");
  const [search] = useSearchParams();
  const navigate = useNavigate();

  useEffect(redirect, []);

  function redirect() {
    if (search.get("page") === null) {
      navigate("?page=main", { replace: true });
    }
  }

  return (
    <WrapOrder visible={map.visible ? 1 : 0}>
      <Header />
      {search.get("page") === "connect" && <Connect />}
      {search.get("page") === "main" && <Main />}
    </WrapOrder>
  );
};
