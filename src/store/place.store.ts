import { StoreonModule } from "storeon";
import { Place } from "../vite-env";
import { LatLng } from "leaflet";

interface Data {
  isLoading: boolean;
  place: Place | null;
  position: LatLng | null;
  error: unknown | null;
}

export interface PlaceState {
  place: {
    from: null | Data;
    to: null | Data;
  };
}

export interface PlaceEvents {
  "place/get": { position: LatLng; key: keyof PlaceState["place"] };

  "#place/get/req": { key: keyof PlaceState["place"] };
  "#place/get/res": {
    key: keyof PlaceState["place"];
    place: Place | null;
    position: LatLng | null;
    error: unknown | null;
  };
}

const initState: PlaceState = {
  place: {
    from: null,
    to: null,
  },
};

export const placeStore: StoreonModule<PlaceState, PlaceEvents> = (store) => {
  store.on("@init", () => ({ ...initState }));

  store.on("#place/get/req", (s, { key }) => ({
    place: {
      ...s.place,
      [key]: {
        isLoading: true,
        place: null,
        position: null,
        error: null,
      },
    },
  }));

  store.on("#place/get/res", (s, { key, place, position, error }) => ({
    place: {
      ...s.place,
      [key]: {
        isLoading: false,
        place,
        position,
        error,
      },
    },
  }));

  store.on("place/get", async (_state, { key, position }) => {
    store.dispatch("#place/get/req", { key });

    try {
      const posResult = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
      ).then<Place>((r) => r.json());
      const pos = new LatLng(Number(posResult.lat), Number(posResult.lon));

      const result = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${pos.lat}&lon=${pos.lng}&format=json`
      ).then<Place>((r) => r.json());

      store.dispatch("#place/get/res", {
        key,
        place: result,
        position: new LatLng(Number(result.lat), Number(result.lon)),
        error: null,
      });

      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    } catch (error) {
      store.dispatch("#place/get/res", {
        key,
        place: null,
        position: null,
        error,
      });
    }
  });
};
