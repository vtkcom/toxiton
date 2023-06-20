import { LatLng } from "leaflet";
import { StoreonModule } from "storeon";
import { Place } from "../vite-env";

export interface MapState {
  map: {
    position: LatLng | null;
    place: Place | null;
    zoom: number;
  };
}

export interface MapEvents {
  "map/position/set": { position: LatLng };
  "map/adress/set": { place: Place };
  "map/zoom/plus": undefined;
  "map/zoom/minus": undefined;
  "map/zoom/set": { zoom: number };
}

const initState: MapState = {
  map: {
    position: null,
    place: null,
    zoom: 10,
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
};
