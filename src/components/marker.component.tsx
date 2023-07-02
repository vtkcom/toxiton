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
        background-color: ${(p) => opacify(-0.8, p.theme.button_color)};
        border: 1px solid ${(p) => opacify(-0.9, p.theme.button_color)};
        color: ${(p) => p.theme.button_text_color};
        backdrop-filter: blur(4px);
        box-shadow: ${(p) => p.theme.box_shadow};
        filter: drop-shadow(0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.8));
    }
    .toxyton-marker {
        & > svg > use {
            stroke-width: 1.5px;
        }
    }
`;

interface Props {
  size: number;
  iconName: IconName;
  iconSize: string;
  position: LatLng;
}

export const Marker: React.FC<Props> = ({
  size = 50,
  iconName,
  iconSize = "50%",
  position,
}) => {
  const markerImage = useMemo(getDiv, []);

  function getDiv(): DivIcon {
    const div = document.createElement("div");

    div.classList.add(`${iconName}-marker`);
    div.innerHTML += `<svg width="${iconSize}" height="${iconSize}"><use xlink:href="#svg-${iconName}" /></svg>`;
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
