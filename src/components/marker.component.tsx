import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DivIcon, LatLng, Point } from "leaflet";
import { Marker as M } from "react-leaflet";
import { createGlobalStyle } from "styled-components";
import { useStoreon } from "storeon/react";
import { IconName } from "./icon.component";
import { Events, State } from "../store";

const Global = createGlobalStyle<{ name: IconName }>`
    .${(p) => p.name}-marker {
        position: relative;
        display: grid;
        place-items: center;
        text-align: center;
        background: transparent;
        /* border-radius: 50%; */
        /* color: hsla(0, 0%, 100%, 0.85) !important; */
        span {
          position: absolute;
          bottom: -0.8rem;
          left: calc(-2.5rem + 50%);
          font-weight: 600;
          font-size: 85%;
          background: transparent;
          filter: drop-shadow(0.1rem 0.1rem 0.7rem hsla(0, 0%, 0%, 0.4));
          line-height: 0.9;
          color: hsla(0, 0%, 100%, 1);
          width: 5rem;
          pointer-events: painted;
        }
        div {
          filter: drop-shadow(0.1rem 0.1rem 0.8rem hsla(0, 0%, 0%, 0.8));
          background-size: cover;
        }
    }
`;

interface Props {
  size: number;
  iconName: IconName;
  position: LatLng;
  img: string;
  url: {
    href: string;
    title: string;
  };
}

export const Marker: React.FC<Props> = ({
  size = 50,
  iconName,
  position,
  url,
  img,
}) => {
  const navigate = useNavigate();
  const { map } = useStoreon<State, Events>("map");
  const markerImage = useMemo(getDiv, [map.zoom]);

  function getDiv(): DivIcon {
    const div = document.createElement("div");

    div.classList.add(`${iconName}-marker`);
    div.innerHTML += `
      <div style="background-image: url(${img});width: ${size}px; height: ${size}px;" />
      <span style="font-size:${size / 3.5}px">${url.title}</span>
    `;
    div.style.width = "100%";
    div.style.height = "100%";

    return new DivIcon({
      iconSize: new Point(size, size),
      className: `map-marker`,
      html: div,
    });
  }

  function onClick() {
    navigate(url.href);
  }

  return (
    <>
      <Global name={iconName} />
      <M
        position={position}
        eventHandlers={{ click: onClick }}
        icon={markerImage}
      />
    </>
  );
};
