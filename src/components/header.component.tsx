import { styled } from "styled-components";

const HeaderDiv = styled.div`
  position: absolute;
  top: 0;
  z-index: 1001;
  width: 100vw;
  height: 4rem;
  display: grid;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to bottom,
    ${(p) => p.theme.bg_color} 0%,
    hsla(0, 0%, 0%, 0) 85%
  );
  color: ${(p) => p.theme.text_color};
`;

interface Props {
  adress?: string;
}

export const Header: React.FC<Props> = ({ adress }) => {
  return <HeaderDiv>{adress}</HeaderDiv>;
};
