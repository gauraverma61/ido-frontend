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

import useAuth from "@/hooks/useAuth";
import { ChevronDown } from "lucide-react";
import networkIcon from "@/lib/networkIcon";

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

  const { chainId, switchChain, chains } = useAuth();
  console.log(chains, "chains");

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Image src={networkIcon(chainId)} alt="" />
          <ChevronDown size={20} color="white" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-dark-1 border-violet-2 max-h-screen overflow-hidden ">
        <DialogHeader>
          <DialogTitle className=" text-white text-3xl font-bold mb-6">
            Change Network
          </DialogTitle>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 my-10 overflow-y-auto">
            {chains.map((chain) => {
              return (
                <div
                  onClick={() => switchChain({ chainId: chain.id })}
                  className=" w-full flex flex-col gap-2 items-center justify-between bg-dark-1 py-4 px-5 rounded-xl border border-violet-4 cursor-pointer"
                >
                  <Image
                    className="h-[50px] object-contain"
                    src={networkIcon(chain.id)}
                    alt=""
                    objectFit="contain"
                  />
                  <div className=" text-white">{chain.name}</div>
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
