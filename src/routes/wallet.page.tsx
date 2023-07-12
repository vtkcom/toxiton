import { useStoreon } from "storeon/react";
import { Page } from "../components/page.component";
import { Events, State } from "../store";
import { useEffect } from "react";
import { styled } from "styled-components";
import { Copyright } from "../components/copyright.component";
import { useTranslator } from "../hooks/translator.hook";
import { useNavigate } from "react-router-dom";
import { QRCode } from "../components/qr.component";
import { opacify } from "polished";

const Content = styled.div`
  display: grid;
  grid-template-rows: max-content max-content auto max-content;
  gap: 0.5rem;
  padding: 0 1rem 0.5rem;
  height: calc(100vh - 3rem);
  overflow-y: auto;
  h3,
  p {
    margin: 0;
  }
`;

const Connect = styled.div`
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background: ${(p) => opacify(-0.82, p.theme.button_color!)};
  color: ${(p) => p.theme.button_color};
  padding: 0.5rem 1rem;
  & p {
    margin: 0;
    text-align: center;
    color: ${(p) => p.theme.hint_color};
  }
`;

export const Wallet: React.FC = () => {
  const {
    connect: { wallet, url },
    dispatch,
  } = useStoreon<State, Events>("profile", "connect");
  const navigate = useNavigate();
  const t = useTranslator();
  // const memoWallet = useMemo(
  //   () =>
  //     wallets.data.find((a) => a.name.toLowerCase() === search.get("wallet")) ??
  //     null,
  //   [wallets, search]
  // );

  useEffect(getWallets, []);
  useEffect(afterConnect, [wallet]);
  useEffect(redirect, [wallet]);
  useEffect(init, []);

  function getWallets() {
    dispatch("connect/wallets");
  }

  function afterConnect() {
    if (wallet) navigate("?page=main", { replace: true });
  }

  function init() {
    dispatch("map/visible/off");
    dispatch("connect/wallets");

    window.Telegram.WebApp.MainButton.setParams({
      is_active: false,
      is_visible: false,
      text: t("button.connect"),
    });

    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.BackButton.onClick(back);

    return () => {
      window.Telegram.WebApp.BackButton.offClick(back);
    };
  }

  function redirect() {
    if (wallet !== null) navigate("?page=main", { replace: true });
  }

  function back() {
    navigate("?page=connect&prevPage=main");
  }

  if (url)
    return (
      <Page onClose={() => navigate("?page=main", { replace: true })}>
        <Content>
          <h3>{t("connect.title")}</h3>
          <p>{t("connect.information")}</p>
          <Connect>
            <QRCode url={url} />
          </Connect>
          <Copyright />
        </Content>
      </Page>
    );

  return null;
};
