import { createStoreon } from "storeon";
import { MapEvents, MapState, mapStore } from "./map.store";
import { ConnectEvents, ConnectState, connectStore } from "./connect.store";
import { storeonLogger, storeonDevtools } from "storeon/devtools";

export type State = MapState & ConnectState;
export type Events = MapEvents & ConnectEvents;

export const store = createStoreon<State, Events>([
  mapStore,
  connectStore,
  storeonLogger,
  storeonDevtools,
]);
