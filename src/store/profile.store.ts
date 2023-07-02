import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { StoreonModule } from "storeon";
import { Configuration, AccountsApi } from "tonapi-sdk-js";

interface Metadata {
  name: string;
  description: string;
  attributes: Attribute[];
  image: string;
  marketplace?: "getgems.io";
  external_url?: string;
}

interface Attribute {
  trait_type: string;
  value: string;
}

const accounts = new AccountsApi(
  new Configuration({
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TONAPI_KEY}`,
    },
  })
);

export interface ProfileState {
  profile: {
    isLoading: boolean;
    dns: string | null;
    avatar: { url: string; external_url: string } | null;
  };
}

export interface ProfileEvents {
  "profile/update": { wallet: string };
  "#profile/req": undefined;
  "#profile/res": {
    dns: string | null;
    avatar: { url: string; external_url: string } | null;
  };
}

const initState: ProfileState = {
  profile: {
    isLoading: false,
    dns: null,
    avatar: null,
  },
};

export const profileStore: StoreonModule<ProfileState, ProfileEvents> = (
  store
) => {
  store.on("@init", () => ({ ...initState }));

  store.on("#profile/req", (state) => ({
    profile: { ...state.profile, isLoading: true, dns: null, avatar: null },
  }));

  store.on("#profile/res", (state, { dns, avatar }) => ({
    profile: { ...state.profile, isLoading: false, dns, avatar },
  }));

  store.on("profile/update", async (_state, { wallet }) => {
    store.dispatch("#profile/req");

    const [{ domains }, { nftItems }] = await Promise.all([
      accounts.dnsBackResolve({
        accountId: wallet,
      }),
      accounts.getNftItemsByOwner({ accountId: wallet }),
    ]);

    const avatar = nftItems.find(
      (a) => (a.metadata as Metadata)?.marketplace === "getgems.io"
    );

    store.dispatch("#profile/res", {
      dns:
        domains && domains.length
          ? domains.find((a) => new RegExp(".t.me").test(a)) ?? null
          : null,
      avatar: avatar
        ? {
            external_url: `https://tonapi.io/account/${toUserFriendlyAddress(
              avatar.address
            )}`,
            url: avatar.previews!.find((a) => a.resolution === "100x100")!.url,
          }
        : null,
    });
  });
};
