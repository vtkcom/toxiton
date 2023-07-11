import {
  WalletInfo,
  WalletInfoInjectable,
  WalletInfoRemote,
} from "@tonconnect/sdk";
import styled from "styled-components";
import { useDetect } from "../hooks/detect.hook";
import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import { useNavigate } from "react-router-dom";
import { opacify } from "polished";

// type WalletType = "universalLink" | "injected" | "embedded";

const WrapWallet = styled.div`
  background: ${(p) => opacify(-0.82, p.theme.button_color)};
  color: ${(p) => p.theme.button_color};
  /* border: 1px solid ${(p) => p.theme.bg_color_10}; */
  border-radius: 1rem;
  display: grid;
  gap: 1rem;
  padding: 0.5rem 1rem;
  justify-items: center;
  align-content: center;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    /* background: ${(p) => p.theme.button_text_color}; */
  }
`;

interface Props {
  wallet: WalletInfo;
}

export const Wallet: React.FC<Props> = ({ wallet }) => {
  const { dispatch } = useStoreon<State, Events>();
  const { mobile } = useDetect();
  const navigate = useNavigate();

  function onClick() {
    if (
      (wallet as WalletInfoInjectable).injected ||
      (wallet as WalletInfoInjectable).embedded
    ) {
      dispatch("connect/on/js", { wallet });
    } else {
      if ((wallet as WalletInfoRemote).universalLink) {
        dispatch("connect/on/link", { wallet, isOpen: mobile });
        if (!mobile)
          navigate(`?page=connect&wallet=${wallet.name.toLowerCase()}&prevPage=connect`);
      }
    }
  }

  if (
    (wallet as WalletInfoRemote).universalLink ||
    (wallet as WalletInfoInjectable).injected ||
    (wallet as WalletInfoInjectable).embedded
  )
    return (
      <WrapWallet onClick={onClick}>
        <img src={wallet.imageUrl} />
        {wallet.name}
        {/* {JSON.stringify(wallet).split(",").join(",\r\n")} */}
      </WrapWallet>
    );

  return null;
};
