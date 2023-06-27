import { useRef } from "react";
import { css, styled } from "styled-components";
import { Header } from "./header.component";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import car from "../assets/blackcar.png";
import egg from "../assets/egg.png";
import { Footer } from "./footer.component";
import { Page } from "./page.component";
import { opacify } from "polished";

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
  border: 2px solid ${(p) => opacify(-0.5, p.theme.button_color)};
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
  const { dispatch, map } = useStoreon<State, Events>("map", "connect");
  const realInput = useRef<HTMLInputElement>(null);

  return (
    <WrapOrder visible={map.visible ? 1 : 0}>
      <Header />
      <Page>
        {map.visible ? (
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
        ) : (
          <>
            <Main>
              <Input placeholder="Where are you?" stylebg="egg" />
              <Input ref={realInput} stylebg="car" placeholder="Where?" />
            </Main>

            <ButtonSticky>Connect wallet</ButtonSticky>

            <Footer />
          </>
        )}
      </Page>
    </WrapOrder>
  );
};
