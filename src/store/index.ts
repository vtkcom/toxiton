import { createStoreon } from "storeon";
import { MapEvents, MapState, mapStore } from "./map.store";
import { ConnectEvents, ConnectState, connectStore } from "./connect.store";
import { PlaceEvents, PlaceState, placeStore } from "./place.store";
import { storeonLogger, storeonDevtools } from "storeon/devtools";

export type State = MapState & ConnectState & PlaceState;
export type Events = MapEvents & ConnectEvents & PlaceEvents;

export const store = createStoreon<State, Events>([
  mapStore,
  connectStore,
  placeStore,
  storeonLogger,
  storeonDevtools,
]);
