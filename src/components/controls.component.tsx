import { styled } from "styled-components";
import { Icon } from "./icon.component";
import { useMapEvents } from "react-leaflet";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import { Place } from "../vite-env";
import { LatLng } from "leaflet";

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
  &:active {
    transform: scale(1.2);
  }
  svg {
    filter: drop-shadow(0.1rem 0.1rem 0.3rem hsla(0, 0%, 0%, 0.4));
    position: relative;
    left: -1px;
    bottom: -1px;
  }
`;

export const Controll: React.FC = () => {
  const { dispatch } = useStoreon<State, Events>("map");
  const mapEv = useMapEvents({
    async locationfound(e) {
      const result: Place = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      ).then((r) => r.json());
      const position = new LatLng(Number(result.lat), Number(result.lon));

      dispatch("map/position/set", {
        position,
      });

      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");

      mapEv.flyTo(position, 18, { duration: 0.3 });
    },
  });

  return (
    <ControllDiv>
      <Button onClick={() => mapEv.locate()}>
        <Icon name="navigate" size={1.1} />
      </Button>
    </ControllDiv>
  );
};
