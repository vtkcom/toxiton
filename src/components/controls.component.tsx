import { styled } from "styled-components";

const ControllDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(p) => p.theme.bg_color_20};
  z-index: 999;
`;

export const Controll: React.FC = () => {
  return <ControllDiv>fdf</ControllDiv>;
};
