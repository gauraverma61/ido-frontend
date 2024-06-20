import { ethers } from "ethers";
import ERC20ABI from "../ABI/erc20.json";
import React from "react";
import useAuth from "./useAuth";

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  balance: string;
}

interface UseTokenInfoResult {
  tokenInfo: TokenInfo | null;
  loading: boolean;
  error: string | null;
}

const useTokenInfo = (tokenAddress: string): UseTokenInfoResult => {
  const [tokenInfo, setTokenInfo] = React.useState<TokenInfo | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const { account } = useAuth(); 

  React.useEffect(() => {
    const fetchTokenInfo = async () => {
      setLoading(true);
      setError(null);
      if (account) {
        try {
          // Check if the token address is valid
          if (!ethers.isAddress(tokenAddress)) {
            setTokenInfo(null);
            setError("Invalid token address");
            setLoading(false);
            return;
          }

          // Create a new provider from the user's wallet (MetaMask)
          const provider = new ethers.BrowserProvider(window.ethereum);

          // Request access to the user's Ethereum account
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const userAddress = signer.getAddress();

          // Create a new contract instance with the token address and ABI
          const contract = new ethers.Contract(tokenAddress, ERC20ABI, signer);

          // Fetch the token details and user's balance
          const [name, symbol, decimals, totalSupply, balance] =
            await Promise.all([
              contract.name(),
              contract.symbol(),
              contract.decimals(),
              contract.totalSupply(),
              contract.balanceOf(userAddress),
            ]);

          // Format the balance and set the token info state
          setTokenInfo({
            name,
            symbol,
            decimals: Number(decimals), // Convert BigInt to number
            totalSupply: ethers.formatUnits(totalSupply, decimals),
            balance: ethers.formatUnits(balance, decimals),
          });
        } catch (error) {
          setTokenInfo(null);
          setError("Error fetching token info");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setTokenInfo(null);
        setError("Connect Wallet First");
      }
    };

    fetchTokenInfo();
  }, [tokenAddress, account]);
  return { tokenInfo, loading, error };
};

export default useTokenInfo;
