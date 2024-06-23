"use client";
import React from "react";
import Web3Provider from "./wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <Toaster />
          {children}
        </Web3Provider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
