import {
  WalletInfo,
  WalletInfoInjectable,
  WalletInfoRemote,
} from "@tonconnect/sdk";
import styled from "styled-components";
import { opacify } from "polished";

// type WalletType = "universalLink" | "injected" | "embedded";

const WrapWallet = styled.div`
  background: ${(p) => opacify(-0.82, p.theme.button_color!)};
  color: ${(p) => p.theme.button_color};
  border-radius: 1rem;
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  justify-items: center;
  align-content: center;
  cursor: pointer;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
  }
`;

interface Props {
  wallet: WalletInfo;
  onClick: () => void;
}

export const Wallet: React.FC<Props> = ({ wallet, onClick }) => {
  if (
    (wallet as WalletInfoRemote).universalLink ||
    (wallet as WalletInfoInjectable).injected ||
    (wallet as WalletInfoInjectable).embedded
  )
    return (
      <WrapWallet onClick={onClick}>
        <img src={wallet.imageUrl} />
        {wallet.name}
      </WrapWallet>
    );

  return null;
};
