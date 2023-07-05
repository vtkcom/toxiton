import { useStoreon } from "storeon/react";
import { Page } from "../components/page.component";
import { Events, State } from "../store";
import { useEffect } from "react";
import { styled } from "styled-components";
import { Footer } from "../components/footer.component";

const Content = styled.div`
  display: grid;
  grid-template-rows: max-content max-content auto max-content;
  gap: 0.5rem;
  padding: 0 1rem 0.5rem;
  max-height: 100%;
  overflow: auto;
  h3,
  p {
    margin: 0;
  }
`;

export const About: React.FC = () => {
  const { dispatch } = useStoreon<State, Events>();

  useEffect(init, []);

  function init() {
    dispatch("map/visible/off");
  }

  return (
    <Page>
      <Content>
        About
        <Footer />
      </Content>
    </Page>
  );
};
