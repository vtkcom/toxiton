import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useStoreon } from "storeon/react";
import styled from "styled-components";
import { Events, State } from "../store";
import { maskifyAddress } from "../utils/maskifyaddress";
import avatar from "../assets/ninja.png";

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(hsl(0, 0%, 100%) -325%, hsla(0, 0%, 100%, 0.3));
  pointer-events: all;
`;

const Information = styled.div`
  line-height: 0.8rem;
  font-weight: 600;
  font-size: 0.8rem;
  pointer-events: all;
`;

const Profile = styled(Link)<{ visible: number }>`
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
  border-radius: ${(p) => p.theme.border_radius};
  pointer-events: none;
  position: relative;
  color: hsl(0, 0%, 100%) !important;
  line-height: 1;
  align-self: end;
  transform: translate3d(0px, ${(p) => (p.visible ? 0 : -10)}rem, 0px);
  will-change: transform;
`;

export const MiniProfile: React.FC = memo(() => {
  const { map, profile, connect, dispatch } = useStoreon<State, Events>(
    "map",
    "profile",
    "connect"
  );

  useEffect(checkData, [connect.wallet]);

  function checkData() {
    if (connect.wallet !== null && !profile.isLoading)
      dispatch("profile/update", { wallet: connect.wallet });
  }

  return (
    <Profile to={"?page=profile"} visible={map.visible ? 1 : 0}>
      {profile.isLoading ? (
        <>
          <Skeleton circle width={"2rem"} height={"2rem"} />
          <Skeleton width={"5rem"} height={"1rem"} />
        </>
      ) : (
        <>
          {profile.avatar !== null ? (
            <Avatar src={profile.avatar.url} />
          ) : (
            <Avatar src={avatar} />
          )}
          {connect.wallet && (
            <Information>{maskifyAddress(connect.wallet, 3, 6)}</Information>
          )}
        </>
      )}
    </Profile>
  );
});
