import { styled } from "styled-components";
import { Icon } from "./icon.component";

const WrapFooter = styled.footer`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: space-between;
  font-size: 0.7rem;
  color: ${(p) => p.theme.hint_color};
  & > div {
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    gap: 0.2rem;
  }
  & > div a {
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    gap: 0.2rem;
  }
`;

export const Footer: React.FC = () => {
  return (
    <WrapFooter>
      <div>
        Base on{" "}
        <a target="_blank" href="https://ton.org/">
          <Icon name="ton" size={1.2} />
          TON
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href="https://leafletjs.com"
          title="A JavaScript library for interactive maps"
        >
          <Icon name="ua" size={1} />
          Leaflet
        </a>
        &copy;
        <a target="_blank" href="https://www.openstreetmap.org/copyright">
          OpenStreetMap
        </a>
        contributors
      </div>
    </WrapFooter>
  );
};
