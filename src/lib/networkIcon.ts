import polygon from "../../public/icons/network/polygon.svg";
import binance from "../../public/icons/network/binance.svg";
import ether from "../../public/icons/network/ether.svg";
import arbitrum from "../../public/icons/network/arbitrum.svg";
import fantom from "../../public/icons/network/fantom.svg";

const networkIcon = (chainId: number) => {
  // @ts-ignore
  switch (chainId) {
    case 137:
      return polygon;
    case 56:
      return binance;
    case 1:
      return ether;
    case 42161:
      return arbitrum;
    case 250:
      return fantom;
    case 80002:
      return polygon;
    default:
      return polygon;
  }
};

export default networkIcon;
