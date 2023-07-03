import { useEffect, useRef } from "react";
import { css, styled } from "styled-components";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import car from "../assets/blackcar.png";
import egg from "../assets/egg.png";
import { Footer } from "../components/footer.component";
import { Page } from "../components/page.component";
import { opacify } from "polished";
import { useTranslator } from "../hooks/translator.hook";
import { Link, useNavigate } from "react-router-dom";
import { useDetect } from "../hooks/detect.hook";

const Order = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  gap: 0.5rem;
`;

const FakeOrder = styled.div`
  display: grid;
  grid-template-rows: auto max-content;
  /* height: 27vh; */
  background-color: ${(p) => p.theme.bg_color};
  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  top: 2rem;
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
  border: 0.2rem solid ${(p) => opacify(-0.3, p.theme.button_color)};
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

const Button = styled(Link)`
  border-radius: ${(p) => p.theme.border_radius};
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

const Content = styled.div<{ visible: number }>`
  display: grid;
  grid-template-rows: auto max-content max-content;
  gap: 0.5rem;
  /* min-height: calc(100% - 0.5rem); */
  padding: 0 1rem 0.7rem;
  position: relative;
  overflow: ${(p) => (p.visible ? "hidden" : "auto")};
`;

export const Main: React.FC = () => {
  const { dispatch, map, connect } = useStoreon<State, Events>(
    "map",
    "connect"
  );
  const realInput = useRef<HTMLInputElement>(null);
  const t = useTranslator();
  const navigate = useNavigate();
  const { twa } = useDetect();

  useEffect(twaButton, [connect.wallet]);

  function twaButton() {
    if (connect.wallet === null) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: true,
        is_visible: true,
        text: t("button.connect"),
      });
      window.Telegram.WebApp.MainButton.onClick(connectWallet);

      return () => {
        window.Telegram.WebApp.MainButton.setParams({
          is_active: false,
          // is_visible: false,
        });
        window.Telegram.WebApp.MainButton.offClick(connectWallet);
      };
    } else {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: true,
        text: t("button.create"),
      });
      window.Telegram.WebApp.MainButton.onClick(connectWallet);

      return () => {
        window.Telegram.WebApp.MainButton.setParams({
          is_active: false,
          // is_visible: false,
        });
        window.Telegram.WebApp.MainButton.offClick(connectWallet);
      };
    }
  }

  function connectWallet() {
    navigate("?page=connect&prevPage=main");
  }

  return (
    <Page pan>
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
              inputMode="decimal"
              placeholder={t("input.car")}
            />
          </div>
          {!twa && connect.wallet == null ? (
            <Button
              to="?page=connect&prevPage=main"
              onClick={() =>
                window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
              }
            >
              {t("button.connect")}
            </Button>
          ) : (
            <div />
          )}
        </FakeOrder>
      ) : (
        <Content visible={map.visible ? 1 : 0}>
          <Order>
            <Input placeholder={t("input.egg")} stylebg="egg" />
            <Input
              ref={realInput}
              stylebg="car"
              placeholder={t("input.car")}
              inputMode="text"
              type="text"
            />
          </Order>

          {!twa && connect.wallet == null ? (
            <ButtonSticky
              to="?page=connect&prevPage=main"
              onClick={() =>
                window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
              }
            >
              {t("button.connect")}
            </ButtonSticky>
          ) : (
            <div />
          )}

          <Footer />
        </Content>
      )}
    </Page>
  );
};
