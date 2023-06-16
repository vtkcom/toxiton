import { DivIcon, LatLng, Point } from "leaflet";
import React, { useMemo, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { Place } from "../vite-env";
import avatar from "../assets/m1000x1000.jpg";

interface Props {
  setPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
  position: LatLng | null;
}

export const LocationMarker: React.FC<Props> = ({ setPosition, position }) => {
  const [animate, setAnimate] = useState(false);
  const map = useMapEvents({
    async click(e) {
      setAnimate(true);
      const result: Place = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      ).then((r) => r.json());

      setAnimate(false);
      setPosition(new LatLng(Number(result.lat), Number(result.lon)));
    },
    locationfound(e) {
      setPosition(e.latlng);

      map.flyTo(e.latlng, 18, { duration: 0.3 });
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

  return position === null ? null : (
    <Marker zIndexOffset={1005} position={position} icon={markerImage} />
  );
};
