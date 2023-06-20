import { createStoreon } from "storeon";
import { MapEvents, MapState, mapStore } from "./map.store";

export type State = MapState;
export type Events = MapEvents;

export const store = createStoreon<State, Events>([mapStore]);
