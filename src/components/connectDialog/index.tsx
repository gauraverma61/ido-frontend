"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import Metamask from "../../../public/images/MetaMask_Fox.svg.png";
import WalletConnect from "../../../public/images/walletConnect.webp";
import Coinbase from "../../../public/images/coinbaseWallet.webp";
import Trustwallet from "../../../public/images/trustwallet.webp";
import { useConnect } from "wagmi";
import {
  injected,
  metaMask,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";
import { useAccountEffect } from "wagmi";

const ConnectDialog = () => {
  const { connect } = useConnect();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  useAccountEffect({
    onConnect(data) {
      console.log("Connected!", data);
      setIsDialogOpen(false);
    },
    onDisconnect() {
      console.log("Disconnected!");
    },
  });
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className=" hidden lg:block bg-violet-1 font-semibold text-base text-white hover:bg-violet-2 ">
          Connect
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-dark-1 border-violet-2">
        <DialogHeader>
          <DialogTitle className=" text-white text-3xl font-bold mb-6">
            Connect Wallet
          </DialogTitle>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 my-10 max-w-[90%] mx-auto">
            <div
              onClick={() => connect({ connector: metaMask() })}
              className=" flex flex-col gap-2 items-center justify-between bg-dark-1 py-4 rounded-xl border border-violet-4 cursor-pointer"
            >
              <Image
                className="h-[60px] object-contain"
                src={Metamask}
                alt=""
                objectFit="contain"
              />
              <span className=" text-white">Metamask</span>
            </div>
            <div
              // onClick={() => connect({ connector: walletConnect() })}
              className=" flex flex-col gap-2 items-center justify-between bg-dark-1 py-4 rounded-xl border border-violet-4 cursor-pointer"
            >
              <Image
                className="h-[50px] object-contain"
                src={WalletConnect}
                alt=""
                objectFit="contain"
              />

              <span className=" text-white">Walletconnect</span>
            </div>
            <div
              onClick={() => connect({ connector: coinbaseWallet() })}
              className=" flex flex-col gap-2 items-center justify-between bg-dark-1 py-4 rounded-xl border border-violet-4 cursor-pointer"
            >
              <Image
                className="h-[50px] object-contain"
                src={Coinbase}
                alt=""
                objectFit="contain"
              />

              <span className=" text-white">Coinbase Wallet</span>
            </div>
            <div className=" flex flex-col gap-2 items-center justify-between bg-dark-1 py-4 rounded-xl border border-violet-4 cursor-pointer">
              <Image
                className="h-[50px] object-contain"
                src={Trustwallet}
                alt=""
                objectFit="contain"
              />
              <span className=" text-white">Trust Wallet</span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectDialog;
