import { styled } from "styled-components";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";

const HeaderDiv = styled.div`
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 5rem;
  display: grid;
  justify-items: center;
  align-content: center;
  grid-auto-rows: max-content;
  filter: drop-shadow(0.1rem 0.1rem 0.3rem hsla(0, 0%, 0%, 0.4));
  background: linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0.2) 0%,
      hsla(0, 0%, 0%, 0.1) 20%,
      hsla(0, 0%, 0%, 0) 90%
    ),
    linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0.2) 0%,
      hsla(0, 0%, 0%, 0.1) 35%,
      hsla(0, 0%, 0%, 0) 80%
    ),
    linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0.2) 0%,
      hsla(0, 0%, 0%, 0.1) 35%,
      hsla(0, 0%, 0%, 0) 80%
    );
  color: hsl(0, 0%, 100%);
  pointer-events: none;
  font-weight: 600;
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
