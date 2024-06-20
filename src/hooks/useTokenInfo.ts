import { ethers } from "ethers";
import ERC20ABI from "../ABI/erc20.json";
import React from "react";
import useAuth from "./useAuth";

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
}

const useTokenInfo = (tokenAddress: string): TokenInfo | null => {
  const [tokenInfo, setTokenInfo] = React.useState<TokenInfo | null>(null);
  const { account } = useAuth();

  React.useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // Check if the token address is valid
        if (!ethers.isAddress(tokenAddress)) {
          console.error("Invalid token address");
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
        const [name, symbol, decimals, balance] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.decimals(),
          contract.balanceOf(userAddress),
        ]);

        // Format the balance and set the token info state
        setTokenInfo({
          name,
          symbol,
          decimals,
          balance: ethers.formatUnits(balance, decimals),
        });
        
      } catch (error) {
        console.error("Error fetching token info:", error);
        setTokenInfo(null);
      }
    };

    fetchTokenInfo();
  }, [tokenAddress, account]);
  return tokenInfo;
};

export default useTokenInfo;
