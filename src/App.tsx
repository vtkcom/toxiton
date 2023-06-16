import { MouseEvent, useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import avatar from "./assets/m1000x1000.jpg";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Icon, LatLng, Point } from "leaflet";

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
      if (props.position) {
        setAnimate(true);
        const result: Place = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
        ).then((r) => r.json());

        console.log(result);

        setAnimate(false);
        props.setPosition(new LatLng(Number(result.lat), Number(result.lon)));
      }
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

  function navigate(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    map.locate();
  }

  return props.position === null ? (
    <div className="navigate" onClick={navigate}>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M3 11l19-9-9 19-2-8-8-2z"
          stroke="currentcolor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p>Touch to navigate</p>
    </div>
  ) : (
    <Marker position={props.position} icon={markerImage} attribution="Test" />
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
    <>
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
      {currentAdress !== null && (
        <div className="header">
          {currentAdress?.address.road}, {currentAdress?.address.house_number}
        </div>
      )}
    </>
  );
}

export default App;
