import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, Map as M } from "leaflet";
import { Controll } from "./controll.component";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import { useEffect, useRef } from "react";
import { LocationMarker } from "./locationmarker.component";
import { Marker } from "./marker.component";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export const Map: React.FC<Props> = () => {
  const { dispatch, map, place } = useStoreon<State, Events>("map", "place");
  const mapRef = useRef<M | null>(null);

  useEffect(getAdress, [place.from?.position, dispatch]);
  useEffect(vibro, [map.visible]);

  function getAdress() {
    if (place.from !== null && place.from.position !== null) {
      mapRef.current?.flyTo(place.from.position, 18, { duration: 0.4 });
    }
  }

  function vibro() {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
  }

  return (
    <MapContainer
      center={[52.382172, 105.957225]}
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

      <Marker
        iconName="github"
        size={35}
        position={new LatLng(52.726062, 103.663365)}
      />
      <Marker
        iconName="toxyton"
        size={50}
        position={new LatLng(51.544396, 104.056692)}
      />
      {/* <Marker
        iconName="bell"
        size={25}
        position={new LatLng(51.888076, 107.515844)}
      /> */}
    </MapContainer>
  );
};
