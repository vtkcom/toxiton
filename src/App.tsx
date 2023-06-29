import { useEffect } from "react";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";
import { Global, theme } from "./theme";
import { Map } from "./components/map.component";
import { Sprites } from "./sprites";
import { Pages } from "./pages";
import { Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter } from "react-router-dom";

export interface Place {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: Address;
}

export interface Address {
  house_number: string;
  road: string;
  neighbourhood?: string;
  suburb: string;
  city_district?: string;
  city: string;
  county: string;
  state: string;
  "ISO3166-2-lvl4": string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
}

function App() {
  useEffect(getFull, []);

  function getFull() {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.enableClosingConfirmation();
  }

  // async function navigate(e: KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === "Enter") {
  //     setResult({
  //       isLoading: true,
  //       data: [],
  //     });
  //     const result = await fetch(
  //       `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1`
  //     ).then((r) => r.json());
  //     setResult({
  //       isLoading: false,
  //       data: result,
  //     });
  //   }
  // }

  return (
    <StyleSheetManager enableVendorPrefixes>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/toxiton">
          <SkeletonTheme borderRadius="0.3rem">
            <Map />

            <Routes>
              <Route path="*" element={<Pages />} />
            </Routes>

            <Sprites />
          </SkeletonTheme>
          <Global />
        </BrowserRouter>
      </ThemeProvider>
    </StyleSheetManager>
  );
}

export default App;
