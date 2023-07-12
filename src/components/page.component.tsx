import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import useDebounce from "../hooks/debounce.hook";

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
  height: 2.5rem;
  pointer-events: auto;
  position: absolute;
  top: -1rem;
  left: 0;
  right: 0;
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
  border-radius: ${(p) => p.theme.border_radius} ${(p) => p.theme.border_radius}
    0 0;
  box-shadow: 0 -0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  pointer-events: all;
  z-index: 999;
  transform: translate3d(
    0px,
    ${(p) => (p.visible ? "calc(100vh - 14rem)" : "1rem")},
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

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  pan?: boolean;
  onClose?: (bool?: boolean) => void;
}

export const Page: React.FC<Props> = ({ children, pan = false, onClose }) => {
  const { dispatch, map } = useStoreon<State, Events>("map");
  const [size, setSize] = useState({ y: 0 });

  useDebounce(toggleVisible, size, 100);

  function toggleVisible() {
    const max = 67;
    const min = 2.1;

    if (size.y !== 0) {
      if ((size.y <= min || size.y < 3) && map.visible) {
        dispatch("map/visible/off");
      }
      if ((size.y >= max || size.y > 3) && !map.visible) {
        dispatch("map/visible/on");
        if (onClose) onClose();
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

  return (
    <WrapPage visible={map.visible ? 1 : 0}>
      <Pan onMouseDown={mouseHandler} onTouchStart={touchHandler} />
      {children}
    </WrapPage>
  );
};
