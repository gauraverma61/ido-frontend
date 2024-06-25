"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useAccountEffect } from "wagmi";
import polygon from "../../../public/icons/network/polygon.svg";
import binance from "../../../public/icons/network/binance.svg";
import ether from "../../../public/icons/network/ether.svg";
import arbitrum from "../../../public/icons/network/arbitrum.svg";
import fantom from "../../../public/icons/network/fantom.svg";
import useAuth from "@/hooks/useAuth";
import { SupportedNetworksArray, supportNetwork } from "@/constants/networks";

const NetworkDialog = () => {
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

  const networkIcon = (chainId: number) => {
    // @ts-ignore
    switch (supportNetwork[chainId]?.chainId) {
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
      default:
        return polygon;
    }
  };

  const { chainId, switchChain } = useAuth();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Image src={networkIcon(chainId)} alt="" className=" cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-dark-1 border-violet-2 max-h-screen overflow-hidden ">
        <DialogHeader>
          <DialogTitle className=" text-white text-3xl font-bold mb-6">
            Change Network
          </DialogTitle>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 my-10 overflow-y-auto">
            {SupportedNetworksArray.map((networkID) => {
              return (
                <div
                  onClick={() => switchChain({ chainId: networkID })}
                  className=" w-full flex flex-col gap-2 items-center justify-between bg-dark-1 py-4 px-5 rounded-xl border border-violet-4 cursor-pointer"
                >
                  <Image
                    className="h-[50px] object-contain"
                    src={networkIcon(networkID)}
                    alt=""
                    objectFit="contain"
                  />
                  <div className=" text-white">
                    {supportNetwork[networkID]?.name}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkDialog;
