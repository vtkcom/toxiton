import { DivIcon, Marker as M, Point } from "leaflet";
import React, { useMemo, useRef, useState } from "react";
import { Marker, useMapEvent } from "react-leaflet";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import ninja from "../assets/ninja.png";
import useDebounce from "../hooks/debounce.hook";

export const LocationMarker: React.FC = () => {
  const { dispatch, map, place } = useStoreon<State, Events>("map", "place");
  const [zoom, setZoom] = useState(map.zoom);
  const markerRef = useRef<M | null>(null);
  const eventHandlers = useMemo(() => ({ dragend }), [markerRef]);
  const markerImage = useMemo(getIcon, [map.zoom]);
  useMapEvent("zoom", (e) => {
    setZoom(e.target._zoom);
  });
  useDebounce(handleZoom, zoom, 300);

  function getIcon(): DivIcon {
    const img = document.createElement("img");
    const size = (5 * map.zoom) / 1.7;

    img.src = ninja;
    img.style.width = "90%";
    img.style.height = "90%";

    return new DivIcon({
      iconSize: new Point(size, size),
      className: `avatar`,
      html: img,
    });
  }

  function handleZoom() {
    if (map.zoom !== zoom) dispatch("map/zoom/set", { zoom });
  }

  function dragend() {
    if (markerRef.current != null) {
      const position = markerRef.current.getLatLng();

      dispatch("place/get", { key: "from", position });
    }
  }

  return place.from !== null && place.from.position !== null ? (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      ref={markerRef}
      zIndexOffset={1005}
      position={place.from.position}
      icon={markerImage}
    />
  ) : null;
};
