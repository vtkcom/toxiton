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
  background-image: linear-gradient(
      to bottom,
      ${(p) => p.theme.bg_color} 0%,
      ${(p) => p.theme.bg_color_50} 20%,
      hsla(0, 0%, 0%, 0) 90%
    ),
    linear-gradient(
      to bottom,
      ${(p) => p.theme.bg_color} 0%,
      ${(p) => p.theme.bg_color_50} 35%,
      hsla(0, 0%, 0%, 0) 80%
    );
  color: ${(p) => p.theme.text_color};
  padding: 0 0 3rem;
  pointer-events: none;
`;

interface Props {
  adress?: string;
}

export const Header: React.FC<Props> = ({ adress }) => {
  return <HeaderDiv>{adress}</HeaderDiv>;
};
