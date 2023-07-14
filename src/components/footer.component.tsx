import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDetect } from "../hooks/detect.hook";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import { useTranslator } from "../hooks/translator.hook";
import { Icon } from "./icon.component";

const Button = styled(Link)`
  border-radius: 1rem;
  background-color: ${(p) => p.theme.button_color};
  color: ${(p) => p.theme.button_text_color};
  height: 3rem;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    color: ${(p) => p.theme.button_text_color};
  }
`;

const sticky = css`
  position: sticky;
  bottom: 0.5rem;
`;

const fixed = css`
  position: fixed;
  top: 10rem;
  left: 1rem;
  right: 1rem;
`;

const Content = styled.div<{ visible: number }>`
  ${(p) => (p.visible ? fixed : sticky)}
`;

export const Footer: React.FC = () => {
  const { twa } = useDetect();
  const { dispatch, connect, map } = useStoreon<State, Events>(
    "connect",
    "map"
  );
  const t = useTranslator();

  if (!twa) {
    if (connect.wallet == null) {
      return (
        <Content visible={map.visible ? 1 : 0}>
          <Button
            to="?page=connect&prevPage=main"
            onClick={(e) => {
              window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");

              if (connect.embeddedWallet) {
                e.preventDefault();
                dispatch("connect/on/js", { wallet: connect.embeddedWallet });
              }
            }}
          >
            <Icon name="toncoin" size={1.1} />
            {t("button.connect")}
          </Button>
        </Content>
      );
    }
  }

  return null;
};
