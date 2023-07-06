import { useStoreon } from "storeon/react";
import { Page } from "../components/page.component";
import { Events, State } from "../store";
import { useEffect } from "react";
import { styled } from "styled-components";
import { Footer } from "../components/footer.component";
import { useNavigate } from "react-router-dom";

const Content = styled.div`
  display: grid;
  grid-template-rows: auto max-content;
  gap: 0.5rem;
  padding: 0 1rem 0.5rem;
  max-height: 100%;
  overflow: auto;
  h3,
  p {
    margin: 0;
  }
`;

export const Profile: React.FC = () => {
  const { dispatch, connect } = useStoreon<State, Events>("map", "connect");
  const navigate = useNavigate();

  useEffect(redirect, [connect]);
  useEffect(init, []);

  function init() {
    dispatch("map/visible/off");
  }

  function redirect() {
    if (connect.wallet === null) navigate("?page=main", { replace: true });
  }

  return (
    <Page>
      <Content>
        Profile
        <Footer />
      </Content>
    </Page>
  );
};
