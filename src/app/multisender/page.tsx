"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTokenInfo from "@/hooks/useTokenInfo";
import { trimAddress } from "@/lib/utils";
import { Divide, LoaderCircle } from "lucide-react";
import React from "react";
import CSVUploader from "./CSVUploader";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import networkIcon from "@/lib/networkIcon";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

const Multisender = () => {
  const [address, setAddress] = React.useState("");
  const [stage, setStage] = React.useState(0);
  const [CSVData, setCSVData] = React.useState<[]>([]);
  const [type, setType] = React.useState<"upload" | "manual">("upload");

  const { tokenInfo, loading, error } = useTokenInfo(address);
  const { chainId } = useAuth();
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
        {stage == 0 && (
          <div>
            <h3 className=" text-white font-bold text-xl md:text-2xl mb-2 mt-6">
              Select Token
            </h3>
            <div className=" flex flex-col md:flex-row items-center gap-5 mb-4">
              <Input
                className=" bg-dark-3 outline-none border-violet-3 text-white text-lg py-7 md:w-[80%] lg:w-[60%] placeholder:text-gray-400"
                placeholder="token address ex. 0x33dD527301E6C67593c9Ae59663fdd886e39A79a"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Image src={networkIcon(chainId)} alt="" />
            </div>
            {error && address && (
              <div className=" text-base font-medium text-red-500">{error}</div>
            )}
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
                  <span className=" text-violet-3">
                    {" "}
                    {Number(tokenInfo.totalSupply).toFixed(2)}
                  </span>{" "}
                </div>
                <div className=" bg-dark-1 py-4 px-4 rounded-xl text-white text-lg font-semibold">
                  Token Balance :{" "}
                  <span className=" text-violet-3">{tokenInfo.balance}</span>{" "}
                </div>
                <div className=" bg-dark-1 py-4 px-4 rounded-xl text-white text-lg font-semibold">
                  Token Address :{" "}
                  <span className=" text-violet-3">{trimAddress(address)}</span>{" "}
                </div>
              </div>
            )}
          </div>
        )}
        {stage == 0 && (
          <div className=" flex justify-end">
            <Button
              onClick={() => setStage(1)}
              size={"lg"}
              disabled={!tokenInfo}
              className=" my-4 hidden lg:block bg-violet-1 font-semibold text-base text-white hover:bg-violet-2 "
            >
              Next
            </Button>
          </div>
        )}
        {stage == 1 && (
          <div className=" bg-dark-2 rounded-xl md:w-[90%] lg:w-[60%] px-5 py-4 my-10">
            <h2 className=" text-white font-bold text-2xl mb-3 ">
              Allocations
            </h2>
            <div>
              {type == "upload" && <CSVUploader setCSVData={setCSVData} />}
              {type == "manual" && (
                <Textarea
                  className=" text-white h-[200px] bg-dark-1 rounded-xl border-violet-3 outline-none text-lg placeholder:text-gray-400"
                  placeholder="Insert Allocation: separate with breaks line. By format: address,amount"
                />
              )}
            </div>
            <div className="flex justify-end text-violet-3 mt-3 font-semibold">
              {type == "manual" ? (
                <div
                  className=" cursor-pointer "
                  onClick={() => setType("upload")}
                >
                  Upload CSV{" "}
                </div>
              ) : (
                <div
                  className=" cursor-pointer "
                  onClick={() => setType("manual")}
                >
                  Insert Manually
                </div>
              )}
            </div>
          </div>
        )}
        {stage == 1 && (
          <div className=" flex justify-between">
            <Button
              onClick={() => setStage(0)}
              size={"lg"}
              disabled={!tokenInfo}
              className=" my-4 hidden lg:block bg-violet-1 font-semibold text-base text-white hover:bg-violet-2 "
            >
              Back
            </Button>
            <Button
              size={"lg"}
              disabled={!tokenInfo}
              className=" my-4 hidden lg:block bg-violet-1 font-semibold text-base text-white hover:bg-violet-2 "
            >
              Confirm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multisender;
