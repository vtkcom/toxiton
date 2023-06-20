import { DivIcon, LatLng, Point } from "leaflet";
import React, { useMemo, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { Place } from "../vite-env";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import avatar from "../assets/m1000x1000.jpg";

export const LocationMarker: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const { dispatch, map } = useStoreon<State, Events>("map");
  useMapEvents({
    async contextmenu(e) {
      setAnimate(true);

      const result: Place = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      ).then((r) => r.json());

      setAnimate(false);
      dispatch("map/position/set", {
        position: new LatLng(Number(result.lat), Number(result.lon)),
      });
    },
  });
  const markerImage = useMemo(() => {
    const img = document.createElement("img");
    const size = 50;

    img.src = avatar;
    img.width = size;
    img.height = size;

    return new DivIcon({
      iconUrl: avatar,
      iconRetinaUrl: avatar,
      iconSize: new Point(size, size),
      className: `avatar ${animate ? "animate" : ""}`,
      html: img,
    });
  }, [animate]);

  return map.position === null ? null : (
    <Marker zIndexOffset={1005} position={map.position} icon={markerImage} />
  );
};
