"use client";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"

const Me = () => {
  const { account, disconnect } = useAuth();
  const router = useRouter();
  const { toast } = useToast()

  useEffect(() => {
    if (!account) {
      router.push("/");
    }
  }, [account]);

  return (
    <div className=" container mx-auto px-6 md:px-10 py-12 md:py-20">
      <div className=" bg-dark-1 rounded-xl px-5 md:px-10 py-8">
        <div className=" text-white text-lg font-semibold flex items-center gap-3 mb-10">
          Connected as <span className=" text-2xl">{account}</span>{" "}
          <Copy
            onClick={() => {
              navigator.clipboard.writeText(String(account));
              toast({
                title: "Address Copied",
              })
            }}
            className=" cursor-pointer"
          />
        </div>
        <Button onClick={() => disconnect()}>Logout</Button>
      </div>
    </div>
  );
};

export default Me;
