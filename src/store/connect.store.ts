import TonConnect, {
  type WalletInfo,
  toUserFriendlyAddress,
  WalletInfoRemote,
  WalletInfoInjectable,
} from "@tonconnect/sdk";
import { StoreonModule } from "storeon";

/**
 * Connecting Ton Connect
 */
const connector = new TonConnect({
  manifestUrl: "https://vtkcom.github.io/toxiton/tonconnect-manifest.json",
});

connector.restoreConnection();

export interface ConnectState {
  connect: {
    wallet: string | null;
    url: string | null;
    wallets: {
      isLoading: boolean;
      data: WalletInfo[];
    };
  };
}

export interface ConnectEvents {
  "connect/on/link": { wallet: WalletInfo; isOpen?: boolean };
  "connect/on/js": { wallet: WalletInfo };

  "connect/off": undefined;

  "connect/wallets": undefined;

  "#connect/data/set": { wallet: string | null; url: string | null };

  "#connect/wallets/req": undefined;
  "#connect/wallets/res": { wallets: WalletInfo[] };
}

const initState: ConnectState = {
  connect: {
    wallet: null,
    url: null,
    wallets: {
      isLoading: false,
      data: [],
    },
  },
};

export const connectStore: StoreonModule<ConnectState, ConnectEvents> = (
  store
) => {
  connector.onStatusChange(
    async (wallet) => {
      if (wallet === null) {
        store.dispatch("#connect/data/set", { wallet: null, url: null });
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
      } else {
        store.dispatch("#connect/data/set", {
          wallet: toUserFriendlyAddress(wallet.account.address),
          url: null,
        });
      }
    },
    (err) => {
      console.log(err);
    }
  );

  store.on("@init", () => ({ ...initState }));

  store.on("#connect/data/set", (state, { wallet, url }) => ({
    connect: {
      ...state.connect,
      wallet,
      url,
    },
  }));

  store.on("connect/on/link", async (state, { wallet, isOpen }) => {
    try {
      const url = connector.connect({
        universalLink: (wallet as WalletInfoRemote).universalLink,
        bridgeUrl: (wallet as WalletInfoRemote).bridgeUrl,
      });

      if (url) {
        if (isOpen) {
          window.Telegram.WebApp.openLink(url);
        } else {
          store.dispatch("#connect/data/set", {
            wallet: state.connect.wallet,
            url,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  store.on("connect/on/js", async (_state, { wallet }) => {
    try {
      connector.connect({
        jsBridgeKey: (wallet as WalletInfoInjectable).jsBridgeKey,
      });
    } catch (error) {
      console.log(error);
    }
  });

  store.on("connect/off", async () => {
    try {
      await connector.disconnect();
    } catch (error) {
      console.log(error);
    }

    store.dispatch("#connect/data/set", { wallet: null, url: null });
  });

  store.on("#connect/wallets/req", (state) => ({
    connect: { ...state.connect, wallets: { isLoading: true, data: [] } },
  }));

  store.on("#connect/wallets/res", (state, { wallets }) => ({
    connect: { ...state.connect, wallets: { isLoading: false, data: wallets } },
  }));

  store.on("connect/wallets", async () => {
    store.dispatch("#connect/wallets/req");

    const wallets = await connector.getWallets();

    store.dispatch("#connect/wallets/res", { wallets });
  });
};
