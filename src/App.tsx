import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import avatar from "./assets/m1000x1000.jpg";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Icon, LatLng, Point } from "leaflet";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { Header } from "./components/header.component";

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

function LocationMarker(props: {
  setPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
  position: LatLng | null;
}) {
  const [animate, setAnimate] = useState(false);
  const map = useMapEvents({
    async click(e) {
      setAnimate(true);
      const result: Place = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      ).then((r) => r.json());

      setAnimate(false);
      props.setPosition(new LatLng(Number(result.lat), Number(result.lon)));
    },
    locationfound(e) {
      props.setPosition(e.latlng);

      map.flyTo(e.latlng, 18, { duration: 0.3 });
    },
  });
  const markerImage = useMemo(
    () =>
      new Icon({
        iconUrl: avatar,
        iconRetinaUrl: avatar,
        iconSize: new Point(50, 50),
        className: `avatar ${animate ? "animate" : ""}`,
      }),
    [animate]
  );

  // function navigate(e: MouseEvent<HTMLDivElement>) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   map.locate();
  //   window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
  // }

  return props.position === null ? null : (
    <Marker position={props.position} icon={markerImage} />
  );
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

  function getAdress() {
    async function asyncGetAdress() {
      const result = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position?.lat}&lon=${position?.lng}&format=json`
      ).then((r) => r.json());

      setCurrentAdress(result);
    }
    if (position) asyncGetAdress();
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
      <MapContainer
        center={[52.261802, 104.300412]}
        zoom={10}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>

      <Header
        adress={
          currentAdress
            ? `${currentAdress?.address.road}, ${currentAdress?.address.house_number}`
            : undefined
        }
      />
    </ThemeProvider>
  );
}

export default App;
