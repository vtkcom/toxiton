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
  background: ${(p) => p.theme.bg_color};
  backdrop-filter: blur(5px);
  box-shadow: 0 0 20px -12px hsla(0, 0%, 0%, 0.4);
`;

interface Props {
  adress: string;
}

export const Header: React.FC<Props> = ({ adress }) => {
  return <HeaderDiv>{adress}</HeaderDiv>;
};
