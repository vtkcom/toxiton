import { DivIcon, LatLng, Point } from "leaflet";
import { Marker as M } from "react-leaflet";
import { useMemo } from "react";
import { createGlobalStyle } from "styled-components";
import { IconName } from "./icon.component";
import { useNavigate } from "react-router-dom";

const Global = createGlobalStyle<{ name: IconName }>`
    .${(p) => p.name}-marker {
        position: relative;
        display: grid;
        place-items: center;
        border-radius: 50%;
        color: hsla(0, 0%, 100%, 0.85) !important;
        filter: drop-shadow(0.1rem 0.1rem 0.7rem hsla(0, 0%, 0%, 0.4)) drop-shadow(0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5));
        div {
            position: absolute;
            bottom: -0.8rem;
            font-weight: 300;
            font-size: 85%;
            filter: drop-shadow(0.1rem 0.1rem 0.7rem hsla(0, 0%, 0%, 0.4));
            line-height: 0.9;
            color: hsla(0, 0%, 100%, 1);
        }
    }
`;

interface Props {
  size: number;
  iconName: IconName;
  position: LatLng;
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
}) => {
  const navigate = useNavigate();
  const markerImage = useMemo(getDiv, []);

  function getDiv(): DivIcon {
    const div = document.createElement("div");

    div.classList.add(`${iconName}-marker`);
    div.innerHTML += `<svg width="${size}" height="${size}"><use xlink:href="#svg-${iconName}" /></svg><div style="font-size:${
      size / 3.5
    }px">${url.title}</div>`;
    div.style.width = "100%";
    div.style.height = "100%";
    div.addEventListener("click", onClick);

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
