import { useEffect } from "react";
import { css, styled } from "styled-components";
import { useStoreon } from "storeon/react";
import { opacify } from "polished";
import { Link, useNavigate } from "react-router-dom";
import { Events, State } from "../store";
import { Footer } from "../components/footer.component";
import { Page } from "../components/page.component";
import { useTranslator } from "../hooks/translator.hook";
import { useDetect } from "../hooks/detect.hook";
import car from "../assets/blackcar.png";
import egg from "../assets/egg.png";

const Order = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  gap: 0.5rem;
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
  border-radius: 1rem;
  background-color: ${(p) => p.theme.button_color};
  color: ${(p) => p.theme.button_text_color};
  height: 3rem;
  display: grid;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${(p) => p.theme.button_text_color};
  }
`;

const ButtonSticky = styled(Button)`
  position: sticky;
  bottom: 0.5rem;
`;

const ButtonFixed = styled(Button)`
  position: fixed;
  top: 10rem;
  left: 1rem;
  right: 1rem;
`;

const Content = styled.div<{ visible: number }>`
  display: grid;
  grid-template-rows: auto max-content max-content;
  gap: 0.5rem;
  padding: 0 1rem 0.5rem;
  height: calc(100vh - 3rem);
  overflow: ${(p) => (p.visible ? "hidden" : "auto")};
`;

export const Main: React.FC = () => {
  const { dispatch, map, connect } = useStoreon<State, Events>(
    "map",
    "connect"
  );
  const t = useTranslator();
  const navigate = useNavigate();
  const { twa } = useDetect();

  useEffect(twaMainButton, [connect.wallet]);
  useEffect(twaBackButton, []);

  function twaMainButton() {
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

  function twaBackButton() {
    window.Telegram.WebApp.BackButton.hide();
  }

  function connectWallet() {
    navigate("?page=connect&prevPage=main");
  }

  return (
    <Page pan>
      <Content visible={map.visible ? 1 : 0}>
        <Order>
          {!map.visible && (
            <Input placeholder={t("input.egg")} stylebg="egg" type="address" />
          )}
          <Input
            stylebg="car"
            placeholder={t("input.car")}
            inputMode="text"
            type="address"
            onClick={() => dispatch("map/visible/off")}
          />
        </Order>

        {!twa &&
          connect.wallet == null &&
          [
            !map.visible && (
              <ButtonSticky
                key="sticky"
                to="?page=connect&prevPage=main"
                onClick={() =>
                  window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
                }
              >
                {t("button.connect")}
              </ButtonSticky>
            ),
            map.visible && (
              <ButtonFixed
                key="fixed"
                to="?page=connect&prevPage=main"
                onClick={() =>
                  window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
                }
              >
                {t("button.connect")}
              </ButtonFixed>
            ),
          ].filter(Boolean)}

        {!map.visible && <Footer />}
      </Content>
    </Page>
  );
};
