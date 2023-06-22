import { useMemo, useState } from "react";
import { styled } from "styled-components";
import { Header } from "./header.component";
import { Icon } from "./icon.component";

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
  transition: background 0.5s ease, backdrop-filter 0.2s ease;
`;

const BlockOrder = styled.div`
  position: relative;
  background: ${(p) => p.theme.bg_color};
  transition: transform 0.3s ease;
  height: 98vh;
  padding: 2rem 0 0 0;
  border-radius: ${(p) => p.theme.border_radius} ${(p) => p.theme.border_radius}
    0 0;
  box-shadow: 0 -0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  pointer-events: all;
  z-index: 999;
  overscroll-behavior: none;
`;

const Pan = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 2vh;
  pointer-events: auto;
  position: absolute;
  top: -2vh;
  left: 0;
  overscroll-behavior: none;
  &::before {
    display: block;
    width: 3rem;
    height: 0.25rem;
    content: "";
    pointer-events: auto;
    border-radius: 1rem;
    background: ${(p) => p.theme.secondary_bg_color};
  }
`;

const Content = styled.div`
  display: grid;
  gap: 1rem;
  overscroll-behavior: none;
  height: calc(98vh - 2rem);
  padding: 1rem;
  position: relative;
  transition: all 0.1s ease;
`;

const Footer = styled.div`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: space-between;
  font-size: 0.7rem;
  color: ${(p) => p.theme.hint_color};
  & > div {
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    gap: 0.2rem;
  }
  & > div a {
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    gap: 0.2rem;
  }
`;

const Button = styled.div`
  border-radius: 1rem;
  border: 1px solid ${(p) => p.theme.bg_color_10};
  background-color: ${(p) => p.theme.button_color};
  color: ${(p) => p.theme.button_text_color};
  height: 3rem;
  display: grid;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
`;

export const Order: React.FC = () => {
  const [size, setSize] = useState({ y: 0 });
  const vh = useMemo(() => {
    const max = 67;
    const min = 2.1;

    if (size.y !== 0) {
      if (size.y <= min || size.y < 3) {
        return min;
      }
      if (size.y >= max || size.y > 3) {
        return max;
      }
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
    <WrapOrder
      style={{
        background: `hsl(0deg 0% 0% / ${90 - vh}%)`,
        backdropFilter: `blur(${67 - vh}px)`,
        WebkitBackdropFilter: `blur(${67 - vh}px)`,
      }}
    >
      <Header />
      <BlockOrder
        style={{
          transform: `translate3d(0px, ${vh}vh, 0px)`,
        }}
      >
        <Pan onMouseDown={mouseHandler} onTouchStart={touchHandler} />
        <Content
          style={{
            overflow: vh === 2.1 ? "auto" : "hidden",
          }}
        >
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button>Connect wallet</Button>
          <Footer>
            <div>
              Base on{" "}
              <a target="_blank" href="https://ton.org/">
                <Icon name="ton" size={1.2} />
                TON
              </a>
            </div>
            <div>
              <a
                target="_blank"
                href="https://leafletjs.com"
                title="A JavaScript library for interactive maps"
              >
                <Icon name="ua" size={1} />
                Leaflet
              </a>
              &copy;
              <a target="_blank" href="https://www.openstreetmap.org/copyright">
                OpenStreetMap
              </a>
              contributors
            </div>
          </Footer>
        </Content>
      </BlockOrder>
    </WrapOrder>
  );
};
