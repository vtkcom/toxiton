import { DivIcon, LatLng, Point } from "leaflet";
import { Marker as M } from "react-leaflet";
import { useMemo } from "react";
import { createGlobalStyle } from "styled-components";
import { opacify } from "polished";
import { IconName } from "./icon.component";

const Global = createGlobalStyle<{ name: IconName }>`
    .${(p) => p.name}-marker {
        display: grid;
        place-items: center;
        border-radius: 50%;
        /* background-color: ${(p) => opacify(-0.7, p.theme.button_color)}; */
        color: hsl(0, 0%, 100%);
        /* backdrop-filter: blur(4px); */
        /* box-shadow: ${(p) => p.theme.box_shadow}; */
        filter: drop-shadow(0.1rem 0.1rem 0.7rem hsla(0, 0%, 0%, 0.7)) drop-shadow(0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5));
    }
    /* .toxyton-marker {
        & > svg > use {
            stroke-width: 2px;
        }
    }
    .bell-marker {
        & > svg > use {
            stroke-width: 3.5px;
        }
    } */
`;

interface Props {
  size: number;
  iconName: IconName;
  position: LatLng;
}

export const Marker: React.FC<Props> = ({ size = 50, iconName, position }) => {
  const markerImage = useMemo(getDiv, []);

  function getDiv(): DivIcon {
    const div = document.createElement("div");

    div.classList.add(`${iconName}-marker`);
    div.innerHTML += `<svg width="${size}" height="${size}"><use xlink:href="#svg-${iconName}" /></svg>`;
    div.style.width = "100%";
    div.style.height = "100%";

    return new DivIcon({
      iconSize: new Point(size, size),
      className: `map-marker`,
      html: div,
    });
  }

  return (
    <>
      <Global name={iconName} />
      <M position={position} icon={markerImage} />
    </>
  );
};
