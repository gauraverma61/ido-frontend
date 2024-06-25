import { http, createConfig } from "wagmi";
import {
  mainnet,
  sepolia,
  polygonMumbai,
  bsc,
  arbitrum,
  polygon,
  polygonAmoy,
  fantom,
} from "wagmi/chains";
import {
  coinbaseWallet,
  metaMask,
  walletConnect,
  injected,
} from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, bsc, arbitrum, polygon, polygonAmoy, fantom],
  connectors: [
    metaMask(),
    coinbaseWallet(),
    walletConnect({
      projectId: "3fcc6bba6f1de962d911bb5b5c3dba68",
      showQrModal: true,
    }),
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
    [fantom.id]: http(),
  },
});
