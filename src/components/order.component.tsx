import { useMemo, useState } from "react";
import { styled } from "styled-components";
import { Header } from "./header.component";

const WrapOrder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
  overscroll-behavior: none;
  transition: background 0.5s ease;
`;

const BlockOrder = styled.div`
  position: relative;
  background: ${(p) => p.theme.bg_color};
  /* transform: translate3d(0px, 67vh, 0px); */
  transition: transform 0.3s ease;
  height: 98vh;
  border-radius: ${(p) => p.theme.border_radius} ${(p) => p.theme.border_radius}
    0 0;
  box-shadow: 0 -0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  pointer-events: all;
  z-index: 999;
  overscroll-behavior: none;
  &::before {
    display: block;
    width: 3rem;
    height: 0.2rem;
    content: "";
    pointer-events: auto;
    border-radius: 1rem;
    background: hsla(0, 0%, 100%, 0.7);
    position: absolute;
    top: -0.6rem;
    left: calc(50vw - 1.5rem);
  }
  &::after {
    display: block;
    width: 100vw;
    height: 1.5rem;
    content: "";
    pointer-events: auto;
    position: absolute;
    top: -1.5rem;
    left: 0;
  }
`;

export const Order: React.FC = () => {
  const [size, setSize] = useState({ y: 0 });
  const vh = useMemo(() => {
    const max = 67;
    const min = 2;
    if (size.y !== 0) {
      if (size.y <= min || size.y < 3) return min;
      if (size.y >= max || size.y > 3) return max;
    }
    return max;
  }, [size]);

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

  function touchHandler(mouseDownEvent: React.TouchEvent<HTMLDivElement>) {
    const startSize = size;
    const startPosition = { y: mouseDownEvent.changedTouches[0].pageY };

    function onTouchMove(mouseMoveEvent: React.TouchEvent<HTMLDivElement>) {
      setSize(() => ({
        y:
          (startSize.y -
            startPosition.y +
            mouseMoveEvent.changedTouches[0].pageY) /
          ((
            document.querySelector("app") as HTMLElement
          ).getBoundingClientRect().height /
            100),
      }));
    }
    function onTouchEnd() {
      // @ts-ignore
      document.body.removeEventListener("touchmove", onTouchMove);
    }

    // @ts-ignore
    document.body.addEventListener("touchmove", onTouchMove);
    document.body.addEventListener("touchend", onTouchEnd, { once: true });
  }

  return (
    <WrapOrder
      style={{
        background: `hsl(0deg 0% 0% / ${100 - vh}%)`,
      }}
    >
      <Header />
      <BlockOrder
        onMouseDown={mouseHandler}
        onTouchStart={touchHandler}
        style={{ transform: `translate3d(0px, ${vh}vh, 0px)` }}
      />
    </WrapOrder>
  );
};
