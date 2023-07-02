import { StoreonModule } from "storeon";

export interface MapState {
  map: {
    zoom: number;
    visible: boolean;
  };
}

export interface MapEvents {
  "map/zoom/plus": undefined;
  "map/zoom/minus": undefined;
  "map/zoom/set": { zoom: number };
  "map/visible/on": undefined;
  "map/visible/off": undefined;
}

const initState: MapState = {
  map: {
    zoom: 6.2,
    visible: true,
  },
};

export const mapStore: StoreonModule<MapState, MapEvents> = (store) => {
  store.on("@init", () => initState);

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
};
