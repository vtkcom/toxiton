import { createStoreon } from "storeon";
import { MapEvents, MapState, mapStore } from "./map.store";
import { ConnectEvents, ConnectState, connectStore } from "./connect.store";
import { PlaceEvents, PlaceState, placeStore } from "./place.store";
import { storeonLogger, storeonDevtools } from "storeon/devtools";
import { ProfileEvents, ProfileState, profileStore } from "./profile.store";

export type State = MapState & ConnectState & PlaceState & ProfileState;
export type Events = MapEvents & ConnectEvents & PlaceEvents & ProfileEvents;

export const store = createStoreon<State, Events>([
  mapStore,
  connectStore,
  placeStore,
  profileStore,
  storeonLogger,
  storeonDevtools,
]);
