import { useStoreon } from "storeon/react";
import { Page } from "../components/page.component";
import { Events, State } from "../store";
import { useEffect } from "react";
import { styled } from "styled-components";
import { Footer } from "../components/footer.component";
import { useNavigate, useSearchParams } from "react-router-dom";

const Content = styled.div`
  display: grid;
  grid-template-rows: auto max-content;
  gap: 0.5rem;
  padding: 0 1rem 0.5rem;
  height: calc(100vh - 3rem);
  overflow: auto;
  h3,
  p {
    margin: 0;
  }
`;

export const Profile: React.FC = () => {
  const { dispatch, connect } = useStoreon<State, Events>("map", "connect");
  const navigate = useNavigate();
  const [search] = useSearchParams();

  useEffect(redirect, [connect]);
  useEffect(init, []);

  function init() {
    dispatch("map/visible/off");

    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.BackButton.onClick(back);

    return () => {
      window.Telegram.WebApp.BackButton.offClick(back);
    };
  }

  function back() {
    const prevPage = search.get("prevPage") ?? "main";
    navigate(`?page=${prevPage}`);
  }

  function redirect() {
    if (connect.wallet === null) navigate("?page=main", { replace: true });
  }

  return (
    <Page onClose={() => navigate(`?page=main`)}>
      <Content>
        Profile
        <Footer />
      </Content>
    </Page>
  );
};
