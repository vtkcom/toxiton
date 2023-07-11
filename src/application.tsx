import { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { StoreContext } from "storeon/react";
import { Global, theme } from "./theme";
import { Map } from "./components/map.component";
import { Sprites } from "./sprites";
import { store } from "./store";
import { AppRoutes } from "./routes";
// import logo from "/logo.png";
// import car from "./assets/blackcar.png";
import "leaflet/dist/leaflet.css";
import "react-loading-skeleton/dist/skeleton.css";

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
    // if (!("Notification" in window)) {
    //   console.log("This browser does not support notifications.");
    // } else {
    //   Notification.requestPermission((permission) => {
    //     console.log(permission);
    //   });
    // }

    // const n = new Notification("Title", {
    //   icon: car,
    //   body: "Body",
    //   image: logo,
    //   // actions: [{ action: "open", title: "Open" }],
    // });
    // n.onclick = () => window.focus();
  }

  // useEffect(askNotificationPermission, []);

  // function askNotificationPermission() {
  //   // Let's check if the browser supports notifications
  //   if (!("Notification" in window)) {
  //     console.log("This browser does not support notifications.");
  //   } else {
  //     Notification.requestPermission((permission) => {
  //       console.log(permission);
  //     });
  //   }
  // }

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
    <BrowserRouter basename="/toxiton">
      <StyleSheetManager enableVendorPrefixes>
        <ThemeProvider theme={theme}>
          <StoreContext.Provider value={store}>
            <SkeletonTheme borderRadius="0.3rem">
              <Map />

              <Routes>
                <Route path="*" element={<AppRoutes />} />
              </Routes>

              <Sprites />
            </SkeletonTheme>
            <Global />
          </StoreContext.Provider>
        </ThemeProvider>
      </StyleSheetManager>
    </BrowserRouter>
  );
}

export default App;
