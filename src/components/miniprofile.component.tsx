import Skeleton from "react-loading-skeleton";
import { useStoreon } from "storeon/react";
import styled from "styled-components";
import { Events, State } from "../store";
import { maskifyAddress } from "../utils/maskifyaddress";
import { Link } from "react-router-dom";
import { Icon } from "./icon.component";

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(#ffffff -325%, ${(p) => p.theme.button_color});
  /* transition: all 0.3s ease; */
  /* box-shadow: ${(p) => p.theme.box_shadow}; */
`;

const Information = styled.div`
  display: none;
  gap: 0.2rem;
  line-height: 1;
  font-weight: 600;
  font-size: 0.9rem;
  justify-items: center;
`;

const Profile = styled.div`
  display: grid;
  filter: drop-shadow(0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.8));
  /* grid-auto-flow: column; */
  /* grid-auto-columns: max-content; */
  align-content: center;
  justify-items: center;
  gap: 0.5rem;
  position: relative;
  color: hsl(0, 0%, 100%);
  z-index: 1005;
  /* transition: all 0.3s ease; */
  height: 3rem;
  width: 3rem;
  padding: 0.5rem;
  background: hsla(0, 0%, 100%, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 2rem;
  box-shadow: ${(p) => p.theme.box_shadow};
  pointer-events: all;
  position: relative;
  a {
    display: grid;
    font-weight: 900;
  }
  svg {
    display: none;
  }
  &:hover {
    width: auto;
    height: auto;
    padding: 2rem;
    &::after {
      content: "";
      position: absolute;
      top: 1rem;
      right: 1rem;
      bottom: 1rem;
      left: 1rem;
      border-radius: 1.5rem;
      background: hsla(0, 0%, 0%, 0.1);
      pointer-events: none;
      /* backdrop-filter: blur(4px); */
    }
    ${Information} {
      display: grid;
    }
    ${Avatar} {
      width: 3rem;
      height: 3rem;
    }
    svg {
      display: block;
    }
  }
`;

export const MiniProfile: React.FC = () => {
  const { map, profile, connect, dispatch } = useStoreon<State, Events>(
    "map",
    "profile",
    "connect"
  );

  function quit() {
    dispatch("connect/off");
  }

  return (
    <Profile
      style={{
        transform: `translate3d(0px, ${map.visible ? 0 : -20}rem, 0px)`,
      }}
    >
      {profile.isLoading ? (
        <Skeleton circle width={"2rem"} height={"2rem"} />
      ) : (
        <>
          <Icon name="power" onClick={quit} />
          <Avatar src={profile.avatar?.url} />
          <Information>
            {connect.wallet && (
              <span>{maskifyAddress(connect.wallet, 6, 6)}</span>
            )}
            <Link to={"?page=profile"}>{profile.dns}</Link>
          </Information>
        </>
      )}
    </Profile>
  );
};
