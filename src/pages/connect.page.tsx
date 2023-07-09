import { useStoreon } from "storeon/react";
import { Page } from "../components/page.component";
import { Events, State } from "../store";
import { useEffect } from "react";
import { styled } from "styled-components";
import { Footer } from "../components/footer.component";
import { Wallet } from "../components/wallet.component";
import { useTranslator } from "../hooks/translator.hook";
import { useNavigate } from "react-router-dom";
import {
  WalletInfoInjectable,
  WalletInfoRemote,
} from "@tonconnect/sdk";

const Content = styled.div`
  display: grid;
  grid-template-rows: max-content max-content auto max-content;
  gap: 0.5rem;
  padding: 0 1rem 0.5rem;
  min-height: calc(100% - 1.5rem);
  overflow: auto;
  h3,
  p {
    margin: 0;
  }
`;

const Wallets = styled.div<{ count: number }>`
  display: grid;
  gap: 0.5rem;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  ${(p) => p.count === 4 && `grid-template-columns: repeat(2, 1fr)`};
`;

export const Connect: React.FC = () => {
  const { dispatch, connect } = useStoreon<State, Events>("map", "connect");
  const navigate = useNavigate();
  const t = useTranslator();

  useEffect(redirect, [connect]);
  useEffect(init, []);

  function init() {
    dispatch("map/visible/off");
    dispatch("connect/wallets");

    window.Telegram.WebApp.MainButton.setParams({
      is_active: false,
      is_visible: true,
      text: t("button.connect"),
    });
  }

  function redirect() {
    if (connect.wallet !== null) navigate("?page=main", { replace: true });
  }

  return (
    <Page>
      <Content>
        <h3>{t("connect.title")}</h3>
        <p>{t("connect.information")}</p>
        <Wallets
          count={
            connect.wallets.data.filter(
              (a) =>
                (a as WalletInfoInjectable).injected ||
                (a as WalletInfoInjectable).embedded ||
                (a as WalletInfoRemote).universalLink
            ).length
          }
        >
          {connect.wallets.data.map((wallet) => (
            <Wallet key={wallet.name} wallet={wallet} />
          ))}
        </Wallets>

        <Footer />
      </Content>
    </Page>
  );
};
