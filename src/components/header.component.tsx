import { styled } from "styled-components";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";

const HeaderDiv = styled.div`
  position: absolute;
  top: 0;
  z-index: 1001;
  width: 100vw;
  height: 5rem;
  display: grid;
  justify-items: center;
  align-content: center;
  grid-auto-rows: max-content;
  filter: drop-shadow(0.1rem 0.1rem 0.3rem hsla(0, 0%, 0%, 0.4));
  background: linear-gradient(
      to bottom,
      ${(p) => p.theme.bg_color_20} 0%,
      ${(p) => p.theme.bg_color_10} 20%,
      hsla(0, 0%, 0%, 0) 90%
    ),
    linear-gradient(
      to bottom,
      ${(p) => p.theme.bg_color_20} 0%,
      ${(p) => p.theme.bg_color_10} 35%,
      hsla(0, 0%, 0%, 0) 80%
    );
  color: ${(p) => p.theme.text_color};
  padding: 0 0 3rem;
  pointer-events: none;
  font-weight: 800;
  font-size: 1.05rem;
  user-select: none;
  span {
    font-weight: 200;
    font-size: 0.9rem;
    user-select: none;
  }
`;

export const Header: React.FC = () => {
  const { map } = useStoreon<State, Events>("map");

  return (
    <HeaderDiv>
      {map.place !== null && (
        <>
          {map.place?.address.road}
          {map.place?.address.house_number &&
            ", " + map.place?.address.house_number}
          <span>
            {map.place?.address.country}, {map.place?.address.city}
          </span>
        </>
      )}
    </HeaderDiv>
  );
};
