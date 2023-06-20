import { styled } from "styled-components";
import { Icon } from "./icon.component";
import { useMapEvents } from "react-leaflet";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import { Place } from "../vite-env";
import { LatLng } from "leaflet";
import { useEffect } from "react";

const ControllDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: hsla(0, 0%, 0%, 0.2);
  z-index: 999;
  display: grid;
  grid-auto-rows: max-content;
  gap: 0.5rem;
  padding: 7rem 0.5rem 0 0;
  justify-content: end;
`;

const Button = styled.div`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  border: 1px solid ${(p) => p.theme.bg_color_10};
  box-shadow: ${(p) => p.theme.box_shadow};
  background-color: ${(p) => p.theme.bg_color};
  color: ${(p) => p.theme.hint_color};
  display: grid;
  place-content: center;
  font-size: 2rem;
  font-weight: 400;
  pointer-events: visiblePainted;
  svg {
    filter: drop-shadow(0.1rem 0.1rem 0.3rem hsla(0, 0%, 0%, 0.4));
  }
`;

export const Controll: React.FC = () => {
  const { dispatch, map } = useStoreon<State, Events>("map");
  const mapev = useMapEvents({
    async locationfound(e) {
      const result: Place = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      ).then((r) => r.json());
      const position = new LatLng(Number(result.lat), Number(result.lon));

      dispatch("map/position/set", {
        position,
      });

      mapev.flyTo(position, 18, { duration: 0.3 });

      dispatch("map/zoom/set", { zoom: 18 });
    },
  });

  useEffect(() => {
    mapev?.setZoom(map.zoom);
  }, [map.zoom, mapev]);

  return (
    <ControllDiv>
      <Button onClick={() => dispatch("map/zoom/plus")}>
        <Icon name="plus" size={1.1} />
      </Button>
      <Button onClick={() => dispatch("map/zoom/minus")}>
        <Icon name="minus" size={1.1} />
      </Button>
      <Button onClick={() => mapev.locate()}>
        <Icon name="navigate" size={1.1} />
      </Button>
    </ControllDiv>
  );
};
