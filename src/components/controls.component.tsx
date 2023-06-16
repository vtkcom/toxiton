import { styled } from "styled-components";

const ControllDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(p) => p.theme.bg_color_20};
  z-index: 999;
  display: grid;
  grid-auto-rows: max-content;
  gap: 0.5rem;
  padding: 9rem 0.5rem 0 0;
  justify-content: end;
`;

const Button = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: ${(p) => p.theme.box_shadow};
  background-color: ${(p) => p.theme.bg_color};
  color: ${(p) => p.theme.hint_color};
  display: grid;
  place-items: center;
  font-size: 2rem;
  font-weight: 400;
`;

export const Controll: React.FC = () => {
  return (
    <ControllDiv>
      <Button>+</Button>
      <Button>-</Button>
    </ControllDiv>
  );
};
