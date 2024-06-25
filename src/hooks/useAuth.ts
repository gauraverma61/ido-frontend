import { useAccount } from "wagmi";
import { useChainId } from "wagmi";
import { useDisconnect } from "wagmi";
import { useSwitchChain } from "wagmi";
import { useBalance } from "wagmi";

const useAuth = () => {
  const account = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();

  return {
    account: account.address,
    chainId,
    chains,
    disconnect,
    switchChain,
    useBalance,
  };
};

export default useAuth;
