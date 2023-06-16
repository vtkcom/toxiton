import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import { ThemeProvider } from "styled-components";
import { Global, theme } from "./theme";
import { Header } from "./components/header.component";
import { LocationMarker } from "./components/marker.component";
import { Controll } from "./components/controls.component";

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
  // const [input, setInput] = useState("");
  // const [result, setResult] = useState<{ isLoading: boolean; data: Place[] }>({
  //   isLoading: false,
  //   data: [],
  // });
  const [position, setPosition] = useState<LatLng | null>(null);
  const [currentAdress, setCurrentAdress] = useState<Place | null>(null);

  useEffect(getAdress, [position]);
  useEffect(getFull, []);

  function getAdress() {
    async function asyncGetAdress() {
      const result = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position?.lat}&lon=${position?.lng}&format=json`
      ).then((r) => r.json());

      setCurrentAdress(result);
    }
    if (position) asyncGetAdress();
  }

  function getFull() {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.switchInlineQuery("Test", ["users", "groups"]);
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
    <ThemeProvider theme={theme}>
      <Global />

      <Header
        adress={
          currentAdress
            ? `${currentAdress?.address.road}, ${currentAdress?.address.house_number}`
            : undefined
        }
      />

      <MapContainer
        center={[52.261802, 104.300412]}
        zoom={10}
        scrollWheelZoom={true}
        touchZoom={true}
        zoomControl={false}
      >
        <Controll />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </ThemeProvider>
  );
}

export default App;
