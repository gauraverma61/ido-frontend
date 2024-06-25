export enum Networks {
  BSC = 56,
  ARB = 42161,
  ETH = 1,
  MATIC = 137,
  MUMBAI = 80001,
  FTM = 250,
}

export const DEFAULT_CHAIN_ID = Networks.BSC;
export const SupportedNetworksArray = [
  Networks.MATIC,
  Networks.ARB,
  Networks.ETH,
  Networks.BSC,
  Networks.MUMBAI,
  Networks.FTM
];

export interface ISupportedNetwork {
  name: string;
  chainId: number;
  rpc: string;
  image: string;
  symbol: string;
  explorer: string;
  decimals: number;
}

export const supportNetwork: Record<number | string, ISupportedNetwork> = {
  80001: {
    name: "Polygon Mumbai",
    chainId: 80001,
    rpc: "https://rpc.ankr.com/polygon_mumbai",
    image: "",
    symbol: "MATIC",
    explorer: "https://mumbai.polygonscan.com",
    decimals: 18,
  },
  42161: {
    name: "Arbitrum One",
    chainId: 42161,
    rpc: "https://arb1.arbitrum.io/rpc",
    image: "",
    // symbol: "ETH",
    symbol: "ARB",
    explorer: "https://arbiscan.io",
    decimals: 18,
  },
  137: {
    name: "Polygon",
    chainId: 137,
    rpc: "https://rpc.ankr.com/polygon",
    image: "",
    symbol: "MATIC",
    explorer: "https://polygonscan.com",
    decimals: 18,
  },
  56: {
    name: "BSC",
    chainId: 56,
    rpc: "https://rpc.ankr.com/bsc",
    image: "",
    symbol: "BNB",
    explorer: "https://bscscan.com",
    decimals: 18,
  },
  1: {
    name: "Ethereum",
    chainId: 1,
    rpc: "https://rpc.ankr.com/eth",
    image: "",
    symbol: "ETH",
    explorer: "https://etherscan.io",
    decimals: 18,
  },
  250: {
    name: "Fantom",
    chainId: 250,
    rpc: "https://rpc.ftm.tools",
    image: "",
    symbol: "FTM",
    explorer: "https://ftmscan.com",
    decimals: 18,
  },
  default: {
    name: "BSC",
    chainId: 56,
    rpc: "https://rpc.ankr.com/bsc",
    image: "",
    symbol: "BNB",
    explorer: "https://bscscan.com",
    decimals: 18,
  },
};
