import { styled } from "styled-components";
import { Icon } from "./icon.component";

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
  padding: 7rem 0.5rem 0 0;
  justify-content: end;
`;

const Button = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.bg_color_10};
  box-shadow: ${(p) => p.theme.box_shadow};
  background-color: ${(p) => p.theme.button_color};
  color: ${(p) => p.theme.button_text_color};
  display: grid;
  place-content: center;
  font-size: 2rem;
  font-weight: 400;
  svg {
    filter: drop-shadow(0.1rem 0.1rem 0.3rem hsla(0, 0%, 0%, 0.4));
  }
`;

export const Controll: React.FC = () => {
  return (
    <ControllDiv>
      <Button>
        <Icon name="plus" size={1.1} />
      </Button>
      <Button>
        <Icon name="minus" size={1.1} />
      </Button>
      <Button>
        <Icon name="navigate" size={1.1} />
      </Button>
    </ControllDiv>
  );
};
