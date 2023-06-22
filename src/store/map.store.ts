import { LatLng } from "leaflet";
import { StoreonModule } from "storeon";
import { Place } from "../vite-env";

export interface MapState {
  map: {
    position: LatLng | null;
    place: Place | null;
    zoom: number;
    visible: boolean;
  };
}

export interface MapEvents {
  "map/position/set": { position: LatLng };
  "map/adress/set": { place: Place | null };
  "map/zoom/plus": undefined;
  "map/zoom/minus": undefined;
  "map/zoom/set": { zoom: number };
  "map/visible/on": undefined;
  "map/visible/off": undefined;
  "map/visible/toggle": undefined;
}

const initState: MapState = {
  map: {
    position: null,
    place: null,
    zoom: 10,
    visible: true,
  },
};

export const mapStore: StoreonModule<MapState, MapEvents> = (store) => {
  store.on("@init", () => initState);

  store.on("map/position/set", (s, { position }) => ({
    ...s,
    map: {
      ...s.map,
      position,
    },
  }));

  store.on("map/adress/set", (s, { place }) => ({
    ...s,
    map: {
      ...s.map,
      place,
    },
  }));

  store.on("map/zoom/plus", (s) => ({
    ...s,
    map: {
      ...s.map,
      zoom: s.map.zoom === 18 ? 18 : s.map.zoom + 1,
    },
  }));

  store.on("map/zoom/minus", (s) => ({
    ...s,
    map: {
      ...s.map,
      zoom: s.map.zoom === 10 ? 10 : s.map.zoom - 1,
    },
  }));

  store.on("map/zoom/set", (s, { zoom }) => ({
    ...s,
    map: {
      ...s.map,
      zoom,
    },
  }));

  store.on("map/visible/on", (s) => ({
    ...s,
    map: {
      ...s.map,
      visible: true,
    },
  }));

  store.on("map/visible/off", (s) => ({
    ...s,
    map: {
      ...s.map,
      visible: false,
    },
  }));

  store.on("map/visible/toggle", (s) => ({
    ...s,
    map: {
      ...s.map,
      visible: !s.map.visible,
    },
  }));
};
