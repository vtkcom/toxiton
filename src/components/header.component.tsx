import { styled } from "styled-components";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import Skeleton from "react-loading-skeleton";

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
      hsla(0, 0%, 0%, 0) 100%
    ),
    linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0.2) 0%,
      hsla(0, 0%, 0%, 0.1) 35%,
      hsla(0, 0%, 0%, 0) 100%
    );
  color: hsl(0, 0%, 100%);
  pointer-events: none;
  user-select: none;
`;

const Address = styled.div`
  font-weight: 300;
  font-size: 1.05rem;
  filter: drop-shadow(0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.8));
`;

const City = styled.div`
  font-weight: 300;
  font-size: 0.9rem;
  user-select: none;
  filter: drop-shadow(0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.8));
`;

export const Header: React.FC = () => {
  const { place } = useStoreon<State, Events>("place");

  return (
    <HeaderDiv>
      {place.from !== null && (
        <>
          {place.from.isLoading ? (
            <Skeleton width={250} height={"1.05rem"} style={{ opacity: 0.6 }} />
          ) : (
            <Address>
              {place.from?.place?.address.road ??
                place.from?.place?.address.quarter}
              {place.from?.place?.address.house_number &&
                ", " + place?.from?.place.address.house_number}
            </Address>
          )}

          {place.from.isLoading ? (
            <Skeleton width={150} height={"0.9rem"} style={{ opacity: 0.6 }} />
          ) : (
            <City>
              {place?.from?.place?.address.country},{" "}
              {place?.from?.place?.address.city}
            </City>
          )}
        </>
      )}
    </HeaderDiv>
  );
};
