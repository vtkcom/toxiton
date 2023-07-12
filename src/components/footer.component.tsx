import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDetect } from "../hooks/detect.hook";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import { useTranslator } from "../hooks/translator.hook";

const Wrap = styled.div``;

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

const WrapSticky = styled(Wrap)`
  position: sticky;
  bottom: 0.5rem;
`;

const WrapFixed = styled(Wrap)`
  position: fixed;
  top: 10rem;
  left: 1rem;
  right: 1rem;
`;

export const Footer: React.FC = () => {
  const { twa } = useDetect();
  const { connect, map } = useStoreon<State, Events>("connect", "map");
  const t = useTranslator();

  if (!twa) {
    if (connect.wallet == null) {
      return !map.visible ? (
        <WrapSticky key="sticky">
          <Button
            to="?page=connect&prevPage=main"
            onClick={() =>
              window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
            }
          >
            {t("button.connect")}
          </Button>
        </WrapSticky>
      ) : (
        <WrapFixed key="fixed">
          {<Button
            to="?page=connect&prevPage=main"
            onClick={() =>
              window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
            }
          >
            {t("button.connect")}
          </Button>}
        </WrapFixed>
      );
    }
  }

  return null;
};
