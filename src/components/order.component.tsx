import { useEffect, useRef, useState } from "react";
import { css, styled } from "styled-components";
import { Header } from "./header.component";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import useDebounce from "../hooks/debounce.hook";
import car from "../assets/blackcar.png";
import egg from "../assets/egg.png";
import { Footer } from "./footer.component";

const WrapOrder = styled.div<{ visible: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
  transition: background 0.5s ease, backdrop-filter 0.2s ease;
  background: hsl(0deg 0% 0% / ${(p) => (p.visible ? 10 : 50)}%);
  backdrop-filter: blur(${(p) => (p.visible ? 0 : 5)}px);
`;

const BlockOrder = styled.div<{ visible: number }>`
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
  transform: translate3d(0px, ${(p) => (p.visible ? 67 : 2.1)}vh, 0px);
  will-change: transform;
`;

const top = css`
  padding-bottom: 1.3rem;
  padding-top: 0;
`;

const bot = css`
  padding-bottom: 0;
  padding-top: 1.3rem;
`;

const Pan = styled.div<{ visible: number }>`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 2.5rem;
  pointer-events: auto;
  position: absolute;
  top: -1rem;
  left: 0;
  ${(p) => (p.visible ? top : bot)}
  transition: all 0.2s ease;
  &::before {
    display: block;
    width: 3rem;
    height: 0.25rem;
    content: "";
    pointer-events: auto;
    border-radius: 1rem;
    background: ${(p) => p.theme.secondary_bg_color};
    filter: ${(p) => (p.visible ? "none" : "invert(1)")};
    transition: all 0.2s ease;
  }
`;

const Content = styled.div<{ visible: number }>`
  display: grid;
  grid-template-rows: auto max-content max-content;
  gap: 0.5rem;
  min-height: calc(98vh - 2rem);
  padding: 0 1rem 1rem;
  position: relative;
  overflow: ${(p) => (p.visible ? "hidden" : "auto")};
`;

const Main = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  gap: 0.5rem;
`;

const FakeOrder = styled.div`
  display: grid;
  grid-template-rows: auto max-content;
  height: 27vh;
  background-color: ${(p) => p.theme.bg_color};
  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  padding-bottom: 0.3rem;
`;

const carCss = css`
  background-color: ${(p) => p.theme.secondary_bg_color};
  background-image: url(${car});
  background-position: -1rem center;
  background-size: 6rem;
`;

const eggCss = css`
  background-color: ${(p) => p.theme.secondary_bg_color};
  background-image: url(${egg});
  background-position: -1rem center;
  background-size: 5.7rem;
`;

const Input = styled.input<{ stylebg: "car" | "egg" }>`
  width: 100%;
  height: 3rem;
  border-radius: 1rem;
  border: 1px solid ${(p) => p.theme.bg_color_10};
  box-shadow: inset 0 0 1rem -0.3rem hsla(0, 0%, 0%, 0.4);
  ${(p) => p.stylebg === "car" && carCss}
  ${(p) => p.stylebg === "egg" && eggCss}
  background-repeat: no-repeat;
  color: ${(p) => p.theme.text_color};
  outline: none;
  padding: 0 1rem 0 6rem;
  &::placeholder {
    color: ${(p) => p.theme.hint_color};
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
`;

const ButtonSticky = styled(Button)`
  position: sticky;
  bottom: 0.5rem;
`;

export const Order: React.FC = () => {
  const realInput = useRef<HTMLInputElement>(null);
  const [size, setSize] = useState({ y: 0 });
  const { dispatch, map } = useStoreon<State, Events>("map", "connect");

  useEffect(() => dispatch("connect/wallets"), []);

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
    } else if (!map.visible) {
      dispatch("map/visible/on");
    }

    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
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
    <WrapOrder visible={map.visible ? 1 : 0}>
      <Header />
      <BlockOrder visible={map.visible ? 1 : 0}>
        <Pan
          onMouseDown={mouseHandler}
          onTouchStart={touchHandler}
          visible={map.visible ? 1 : 0}
        />
        <Content visible={map.visible ? 1 : 0}>
          {map.visible && (
            <FakeOrder>
              <div>
                <Input
                  onClick={() => {
                    dispatch("map/visible/off");
                    setTimeout(() => {
                      realInput.current?.click();
                      realInput.current?.focus();
                      document.body.scrollTo({ top: 0 });
                    }, 100);
                  }}
                  stylebg="car"
                  placeholder="Where?"
                />
              </div>
              <Button>Connect wallet</Button>
            </FakeOrder>
          )}
          {!map.visible && (
            <>
              <Main>
                <Input placeholder="Where are you?" stylebg="egg" />
                <Input ref={realInput} stylebg="car" placeholder="Where?" />
              </Main>

              <ButtonSticky>Connect wallet</ButtonSticky>

              <Footer />
            </>
          )}
        </Content>
      </BlockOrder>
    </WrapOrder>
  );
};
