import { styled } from "styled-components";
import { Icon } from "./icon.component";
import { useTranslator } from "../hooks/translator.hook";

const WrapFooter = styled.footer`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: space-between;
  font-size: 0.6rem;
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
  @media (min-height: 400px) and (max-height: 500px) {
    font-size: 0.8rem;
  }
`;

export const Footer: React.FC = () => {
  const t = useTranslator();
  return (
    <WrapFooter>
      <div>
        {t("footer.base")}
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
        {t("footer.contributors")}
      </div>
    </WrapFooter>
  );
};
