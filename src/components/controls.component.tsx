import { styled } from "styled-components";
import { Icon } from "./icon.component";
import { useMapEvents } from "react-leaflet";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";

const ControllDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: grid;
  grid-auto-rows: max-content;
  gap: 0.5rem;
  padding: 0 0.5rem 34vh 0;
  justify-content: end;
  align-content: end;
  pointer-events: none;
  box-shadow: inset 0 0 5rem -0.5rem hsl(0deg 0% 0% / 40%);
`;

const Button = styled.div`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  border: 1px solid ${(p) => p.theme.bg_color_10};
  box-shadow: ${(p) => p.theme.box_shadow};
  background-color: ${(p) => p.theme.button_color};
  color: ${(p) => p.theme.button_text_color};
  display: grid;
  place-content: center;
  font-size: 2rem;
  font-weight: 400;
  pointer-events: visiblePainted;
  transform: scale(1);
  transition: all 0.3s ease;
  cursor: pointer;
  svg {
    filter: drop-shadow(0.1rem 0.1rem 0.3rem hsla(0, 0%, 0%, 0.4));
    position: relative;
    left: -1px;
    bottom: -1px;
  }
`;

export const Controll: React.FC = () => {
  const { dispatch, map } = useStoreon<State, Events>("map", "place");
  const mapEv = useMapEvents({
    async locationfound(e) {
      dispatch("place/get", {
        key: "from",
        position: e.latlng,
      });

      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    },
  });

  return (
    <ControllDiv>
      <Button
        style={{
          transform: `translate3d(0px, ${map.visible ? 0 : -20}rem, 0px)`,
        }}
        onClick={() => mapEv.locate()}
      >
        <Icon name="navigate" size={1.1} />
      </Button>
    </ControllDiv>
  );
};
