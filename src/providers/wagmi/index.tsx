import { WagmiProvider } from "wagmi";
import { config } from "./config";

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default Web3Provider;
