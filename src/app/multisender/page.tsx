"use client";
import { Input } from "@/components/ui/input";
import useTokenInfo from "@/hooks/useTokenInfo";
import { LoaderCircle } from "lucide-react";
import React from "react";

const Multisender = () => {
  const [address, setAddress] = React.useState("");
  const { tokenInfo, loading, error } = useTokenInfo(address);
  console.log(tokenInfo, error, loading);

  return (
    <div className=" container mx-auto px-6 md:px-10 py-12 md:py-20">
      <div className=" bg-dark-1 rounded-xl px-5 md:px-10 py-8">
        <h1 className=" text-violet-1 font-bold text-3xl md:text-4xl mb-2">
          Multisender
        </h1>
        <p className=" text-gray-400 text-base font-medium md:max-w-[50%]">
          Efficiently distribute tokens to multiple recipients in a single
          transaction. Save time, reduce costs, and ensure accurate token
          disbursements.
        </p>
        <h3 className=" text-white font-bold text-xl md:text-2xl mb-2 mt-6">
          Select Token
        </h3>
        <Input
          className=" bg-dark-3 outline-none border-violet-3 mb-4 text-white text-lg py-7 md:w-[80%] lg:w-[60%] placeholder:text-gray-400"
          placeholder="token address ex. 0x33dD527301E6C67593c9Ae59663fdd886e39A79a"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && address && <div className=" text-base font-medium text-red-500">{error}</div>}
        {loading && (
          <div className=" bg-dark-2 flex justify-center items-center rounded-xl md:w-[80%] lg:w-[60%] p-10">
            <LoaderCircle className=" animate-spin text-white" />
          </div>
        )}
        {tokenInfo && (
          <div className=" bg-dark-2 rounded-xl md:w-[90%] lg:w-[60%] px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" bg-dark-1 px-4 py-4 rounded-xl text-white text-lg font-semibold">
              Token Name :{" "}
              <span className=" text-violet-3">{tokenInfo.name}</span>{" "}
            </div>
            <div className=" bg-dark-1 px-4 py-4 rounded-xl text-white text-lg font-semibold">
              Token Symbol :{" "}
              <span className=" text-violet-3"> {tokenInfo.symbol} </span>{" "}
            </div>
            <div className=" bg-dark-1 px-4 py-4 rounded-xl text-white text-lg font-semibold">
              Token Decimals :{" "}
              <span className=" text-violet-3">{tokenInfo.decimals}</span>{" "}
            </div>
            <div className=" bg-dark-1 px-4 py-4 rounded-xl text-white text-lg font-semibold">
              Total Supply :{" "}
              <span className=" text-violet-3"> {tokenInfo.totalSupply}</span>{" "}
            </div>
            <div className=" bg-dark-1 py-4 px-4 rounded-xl text-white text-lg font-semibold">
              Token Balance :{" "}
              <span className=" text-violet-3">{tokenInfo.balance}</span>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multisender;
