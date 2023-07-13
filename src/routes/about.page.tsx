import { useStoreon } from "storeon/react";
import { Page } from "../components/page.component";
import { Events, State } from "../store";
import { useEffect } from "react";
import { styled } from "styled-components";
import { Copyright } from "../components/copyright.component";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { mounted } from "../theme";

const Content = styled.div`
  display: grid;
  grid-template-rows: max-content auto max-content;
  gap: 0.5rem;
  padding: 0 1rem 0.5rem;
  height: calc(100vh - 3rem);
  overflow: auto;
  animation: ${mounted} 0.3s ease forwards;
  h3,
  p {
    margin: 0;
  }
`;

export const About: React.FC = () => {
  const { dispatch } = useStoreon<State, Events>();
  const navigate = useNavigate();
  const [search] = useSearchParams();

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

  return (
    <Page onClose={() => navigate("?page=main")}>
      <Content>
        About
        <Link to="?page=profile&prevPage=about">profile</Link>
        <Copyright />
      </Content>
    </Page>
  );
};
