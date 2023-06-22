import { MapContainer, TileLayer } from "react-leaflet";
import { Controll } from "./controls.component";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import { useEffect } from "react";
import { Place } from "../vite-env";
import { LocationMarker } from "./marker.component";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export const Map: React.FC<Props> = () => {
  const { dispatch, map } = useStoreon<State, Events>("map");

  useEffect(getAdress, [map.position, dispatch]);

  function getAdress() {
    async function asyncGetAdress() {
      dispatch("map/adress/set", { place: null });
      const result: Place = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${map.position?.lat}&lon=${map.position?.lng}&format=json`
      ).then((r) => r.json());

      dispatch("map/adress/set", { place: result });
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    if (map.position) asyncGetAdress();
  }

  return (
    <MapContainer
      center={[52.261802, 104.300412]}
      zoom={map.zoom}
      scrollWheelZoom={true}
      touchZoom={true}
      zoomControl={false}
    >
      <Controll />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};
