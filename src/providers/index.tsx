"use client";
import React from "react";
import EtherProvider from "./wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <EtherProvider>{children}</EtherProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
