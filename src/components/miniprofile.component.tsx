import Skeleton from "react-loading-skeleton";
import { useStoreon } from "storeon/react";
import styled from "styled-components";
import { Events, State } from "../store";
import { maskifyAddress } from "../utils/maskifyaddress";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(#ffffff -325%, ${(p) => p.theme.button_color});
  pointer-events: all;
`;

const Information = styled.div`
  display: grid;
  gap: 0.2rem;
  line-height: 1;
  font-weight: 600;
  font-size: 0.8rem;
  justify-items: center;
  pointer-events: all;
`;

const Profile = styled(Link)`
  display: grid;
  filter: drop-shadow(0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.8));
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  justify-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1005;
  transition: all 0.3s ease;
  height: 3rem;
  width: auto;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background: hsla(0, 0%, 100%, 0.1);
  backdrop-filter: blur(4px);
  box-shadow: ${(p) => p.theme.box_shadow};
  border-radius: 2rem;
  pointer-events: none;
  position: relative;
  color: hsl(0, 0%, 100%) !important;
  line-height: 1;
  align-self: end;
`;

export const MiniProfile: React.FC = () => {
  const { map, profile, connect, dispatch } = useStoreon<State, Events>(
    "map",
    "profile",
    "connect"
  );
  useEffect(checkData, [connect.wallet]);

  function checkData() {
    if (connect.wallet !== null)
      dispatch("profile/update", { wallet: connect.wallet });
  }

  return (
    <Profile
      to={"?page=profile"}
      style={{
        transform: `translate3d(0px, ${map.visible ? 0 : -20}rem, 0px)`,
      }}
    >
      {profile.isLoading ? (
        <>
          <Skeleton circle width={"2rem"} height={"2rem"} />
          <Skeleton width={"6rem"} height={"1rem"} />
        </>
      ) : (
        <>
          {/* <Icon name="power" onClick={quit} /> */}
          <Avatar src={profile.avatar?.url} />
          {connect.wallet && (
            <Information>{maskifyAddress(connect.wallet, 4, 6)}</Information>
          )}
          {/* <Link to={"?page=profile"}>{profile.dns}</Link> */}
        </>
      )}
    </Profile>
  );
};
