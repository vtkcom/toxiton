import { DivIcon, LatLng, Marker as M, Point } from "leaflet";
import React, { useMemo, useRef, useState } from "react";
import { Marker, useMap, useMapEvent } from "react-leaflet";
import { Place } from "../vite-env";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import avatar from "../assets/m1000x1000.jpg";
import useDebounce from "../hooks/debounce.hook";

export const LocationMarker: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [zoom, setZoom] = useState(10);
  const { dispatch, map } = useStoreon<State, Events>("map");
  const mapEl = useMap();
  useMapEvent("zoom", (e) => {
    setZoom(e.target._zoom);
  });
  useDebounce(handleZoom, zoom, 300);
  const markerRef = useRef<M | null>(null);
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;

        if (marker != null) {
          setAnimate(true);

          const result: Place = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${
              marker.getLatLng().lat
            }&lon=${marker.getLatLng().lng}&format=json`
          ).then((r) => r.json());
          const position = new LatLng(Number(result.lat), Number(result.lon));

          setAnimate(false);

          dispatch("map/position/set", {
            position: position,
          });

          mapEl.flyTo(position, 18, {
            duration: 0.3,
          });
        }
      },
    }),
    [markerRef, dispatch, mapEl]
  );
  const markerImage = useMemo(() => {
    const img = document.createElement("img");
    const size = (5 * map.zoom) / 2;

    img.src = avatar;
    img.style.width = "100%";
    img.style.height = "100%";

    return new DivIcon({
      iconUrl: avatar,
      iconRetinaUrl: avatar,
      iconSize: new Point(size, size),
      className: `avatar ${animate ? "animate" : ""}`,
      html: img,
    });
  }, [animate, map.zoom]);

  function handleZoom() {
    if (map.zoom !== zoom) dispatch("map/zoom/set", { zoom });
  }

  return map.position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      ref={markerRef}
      zIndexOffset={1005}
      position={map.position}
      icon={markerImage}
    />
  );
};
