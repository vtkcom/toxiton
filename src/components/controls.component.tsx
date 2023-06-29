import { styled } from "styled-components";
import { Icon } from "./icon.component";
import { useMapEvents } from "react-leaflet";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import { useEffect } from "react";
import { MiniProfile } from "./miniprofile.component";

const ControllDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: grid;
  grid-auto-rows: max-content;
  grid-auto-flow: column;
  gap: 0.5rem;
  padding: 0 0.5rem 34vh;
  justify-content: space-between;
  align-content: end;
  pointer-events: none;
  box-shadow: inset 0 0 5rem -0.5rem hsl(0deg 0% 0% / 40%);
`;

const Button = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: ${(p) => p.theme.box_shadow};
  background: linear-gradient(hsl(0, 0%, 100%) -325%, ${(p) => p.theme.button_color});
  color: ${(p) => p.theme.button_text_color};
  display: grid;
  place-content: center;
  font-size: 2rem;
  font-weight: 400;
  pointer-events: visiblePainted;
  transition: all 0.3s ease;
  cursor: pointer;
  align-self: end;
  svg {
    filter: drop-shadow(0.1rem 0.1rem 0.3rem hsla(0, 0%, 0%, 0.4));
    position: relative;
    left: -1px;
    bottom: -1px;
  }
`;

export const Controll: React.FC = () => {
  const { dispatch, map, connect } = useStoreon<State, Events>(
    "map",
    "place",
    "connect"
  );
  const mapEv = useMapEvents({
    async locationfound(e) {
      dispatch("place/get", {
        key: "from",
        position: e.latlng,
      });

      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    },
  });

  useEffect(checkData, [connect.wallet]);

  function checkData() {
    if (connect.wallet !== null)
      dispatch("profile/update", { wallet: connect.wallet });
  }

  return (
    <ControllDiv>
      {connect.wallet !== null ? <MiniProfile /> : <div />}
      <Button
        style={{
          transform: `translate3d(0px, ${map.visible ? 0 : -20}rem, 0px)`,
        }}
        onClick={() => mapEv.locate()}
      >
        <Icon name="navigate" size={1.1} />
      </Button>
    </ControllDiv>
  );
};
