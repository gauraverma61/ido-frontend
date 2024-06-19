import { WagmiProvider } from "wagmi";
import { config } from "./config";

const EtherProvider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default EtherProvider;
