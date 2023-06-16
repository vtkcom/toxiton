import { styled } from "styled-components";

const HeaderDiv = styled.div`
  position: absolute;
  top: 0;
  z-index: 1001;
  width: 100vw;
  height: 5rem;
  display: grid;
  justify-content: center;
  align-items: center;
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
  font-weight: 600;
  /* transition: background 0.3s ease, color 0.4s ease;
  &:empty {
    background: transparent;
    color: transparent;
  } */
`;

interface Props {
  adress?: string;
}

export const Header: React.FC<Props> = ({ adress }) => {
  return <HeaderDiv>{adress}</HeaderDiv>;
};
