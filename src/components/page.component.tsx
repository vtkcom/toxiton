import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useStoreon } from "storeon/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Events, State } from "../store";
import useDebounce from "../hooks/debounce.hook";
import { Icon } from "./icon.component";
import { useTranslator } from "../hooks/translator.hook";

const top = css`
  padding-bottom: 1.3rem;
  padding-top: 0;
`;

const bot = css`
  padding-bottom: 0;
  padding-top: 1.3rem;
`;

const Pan = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
  pointer-events: auto;
  position: absolute;
  top: -1rem;
  left: 0;
  transition: all 0.2s ease;
  z-index: 1006;
  &::before {
    display: block;
    width: 2rem;
    height: 0.25rem;
    content: "";
    pointer-events: auto;
    border-radius: 1rem;
    background: ${(p) => p.theme.bg_color_70};
    filter: drop-shadow(0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.8));
    transition: all 0.2s ease;
  }
`;

const WrapPage = styled.div<{ visible: number }>`
  display: grid;
  position: relative;
  background: ${(p) => p.theme.bg_color};
  transition: transform 0.3s ease;
  padding: 2rem 0 0 0;
  height: calc(100% - 1rem);
  /* overflow: ${(p) => (p.visible ? "hidden" : "auto")}; */
  border-radius: ${(p) => p.theme.border_radius} ${(p) => p.theme.border_radius}
    0 0;
  box-shadow: 0 -0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  pointer-events: all;
  z-index: 999;
  transform: translate3d(
    0px,
    ${(p) => (p.visible ? "calc(100% - 14rem)" : "1rem")},
    0px
  );
  will-change: transform;
  ${Pan} {
    ${(p) => (p.visible ? top : bot)};
    &::before {
      filter: ${(p) => (p.visible ? "none" : "invert(1)")};
    }
  }
  @media (min-height: 400px) and (max-height: 500px) {
    transform: translate3d(
      0px,
      ${(p) => (p.visible ? "calc(100% - 12rem)" : "1rem")},
      0px
    );
  }
`;

const Header = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  padding: 0.5rem 1.3rem;
  font-size: 0.8rem;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: space-between;
  span {
    color: ${(p) => p.theme.link_color};
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: center;
    gap: 0.3rem;
  }
`;

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  pan?: boolean;
}

export const Page: React.FC<Props> = ({ children, pan = false }) => {
  const { dispatch, map } = useStoreon<State, Events>("map", "connect");
  const [size, setSize] = useState({ y: 0 });
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const t = useTranslator();

  useDebounce(() => toggleVisible(), size, 100);

  function toggleVisible() {
    const max = 67;
    const min = 2.1;

    if (size.y !== 0) {
      if ((size.y <= min || size.y < 3) && map.visible) {
        dispatch("map/visible/off");
      }
      if ((size.y >= max || size.y > 3) && !map.visible) {
        dispatch("map/visible/on");
      }
    } else if (!map.visible && pan) {
      dispatch("map/visible/on");
    }
  }

  function mouseHandler(mouseDownEvent: React.MouseEvent<HTMLDivElement>) {
    const startSize = size;
    const startPosition = { y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: React.MouseEvent<HTMLDivElement>) {
      setSize(() => ({
        y:
          (startSize.y - startPosition.y + mouseMoveEvent.pageY) /
          ((
            document.querySelector("app") as HTMLElement
          ).getBoundingClientRect().height /
            100),
      }));
    }
    function onMouseUp() {
      // @ts-ignore
      document.body.removeEventListener("mousemove", onMouseMove);
    }

    // @ts-ignore
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  }

  function touchHandler(touchEvent: React.TouchEvent<HTMLDivElement>) {
    const startSize = size;
    const startPosition = { y: touchEvent.changedTouches[0].pageY };

    function onTouchMove(e: React.TouchEvent<HTMLElement>) {
      setSize(() => ({
        y:
          (startSize.y - startPosition.y + e.changedTouches[0].pageY) /
          ((
            document.querySelector("app") as HTMLElement
          ).getBoundingClientRect().height /
            100),
      }));
    }

    function onTouchEnd() {
      // @ts-ignore
      document.removeEventListener("touchmove", onTouchMove);
    }

    // @ts-ignore
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd, { once: true });
  }

  function close() {
    dispatch("map/visible/on");
    navigate("?page=main");
  }

  function back() {
    navigate(`?page=${search.get("prevPage")}`);
  }

  return (
    <WrapPage visible={map.visible ? 1 : 0}>
      {pan && <Pan onMouseDown={mouseHandler} onTouchStart={touchHandler} />}
      {!pan && (
        <Header>
          {search.get("prevPage") ? (
            <span onClick={back}>
              <Icon name="back" size={1.2} />
              {t("button.back")}
            </span>
          ) : (
            <div />
          )}
          <span onClick={close}>{t("button.close")}</span>
        </Header>
      )}
      {children}
    </WrapPage>
  );
};
