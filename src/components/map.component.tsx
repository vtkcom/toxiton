import { MapContainer, TileLayer } from "react-leaflet";
import { Map as M } from "leaflet";
import { Controll } from "./controls.component";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import { useEffect, useRef } from "react";
import { LocationMarker } from "./marker.component";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export const Map: React.FC<Props> = () => {
  const { dispatch, map, place } = useStoreon<State, Events>("map", "place");
  const mapRef = useRef<M | null>(null);

  useEffect(getAdress, [place.from?.position, dispatch]);

  function getAdress() {
    if (place.from !== null && place.from.position !== null) {
      mapRef.current?.flyTo(place.from.position, 18, { duration: 0.4 });
    }
  }

  return (
    <MapContainer
      center={[52.261802, 104.300412]}
      zoom={map.zoom}
      scrollWheelZoom={true}
      touchZoom={true}
      zoomControl={false}
      ref={mapRef}
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
