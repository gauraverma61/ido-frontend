"use client";
import { Input } from "@/components/ui/input";
import { ethers } from "ethers";
import { Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import useTokenInfo from "@/hooks/useTokenInfo";
import networkIcon from "@/lib/networkIcon";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LockSchema from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { trimAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";

interface IFormValues {
  tokenOrLPTokenAddress: string;
  title: string;
  useAnotherOwner: boolean;
  ownerAddress?: string; // Make optional, since it's only required when useAnotherOwner is true
  amount: string;
  lockUntil?: Date; // Change to Date
  TGEDate?: Date; // Change to Date
  TGEPercentage?: number;
  CycleTime?: number;
  CycleReleasePercent?: number;
  isvesting: boolean;
  islp: boolean;
}

const isAddress = (address: string | undefined) =>
  ethers.isAddress(address || "");

const CreateLocker = () => {
  const [step, setStep] = useState<number>(1);

  const initialValues: IFormValues = {
    tokenOrLPTokenAddress: "",
    title: "",
    ownerAddress: "",
    amount: "",
    lockUntil: new Date(),
    TGEDate: new Date(),
    TGEPercentage: undefined,
    CycleTime: undefined,
    CycleReleasePercent: undefined,
    useAnotherOwner: false,
    isvesting: false,
    islp: false,
  };

  const form = useForm<z.infer<typeof LockSchema>>({
    resolver: zodResolver(LockSchema),
    defaultValues: initialValues,
  });

  const handleSubmitLock = (values: z.infer<typeof LockSchema>) => {};

  // const handleSubmitLock = async (values: IFormValues) => {
  //   console.log(values);
  //   const erc20 = new ethers.Contract(
  //     values.tokenOrLPTokenAddress,
  //     erc20abi,
  //     library
  //   );
  //   const decimals = await erc20.decimals();
  //   const approved = await handleApprove(values, decimals);
  //   if (approved) {
  //     if (chainId && account && library) {
  //       try {
  //         let web3 = getWeb3(chainId);
  //         setLockLoading(true);
  //         let lockAddress = contract[chainId]
  //           ? contract[chainId].lockAddress
  //           : contract["default"].lockAddress;
  //         let lockContract = getContract(LockerABI, lockAddress, library);
  //         if (values.isvesting) {
  //           // @ts-ignore
  //           let tx = await lockContract.vestingLock(
  //             values.useAnotherOwner ? values.ownerAddress : account,
  //             values.tokenOrLPTokenAddress,
  //             values.islp,
  //             mulDecimal(values.amount, decimals),
  //             moment.utc(values.TGEDate).unix(),
  //             (values?.TGEPercentage || 0) * 100,
  //             (values?.CycleTime || 0) * 60 * 60 * 24,
  //             (values?.CycleReleasePercent || 0) * 100,
  //             values.title,
  //             { from: account }
  //           );
  //           await toast.promise(tx.wait, {
  //             pending: "Confirming Transaction...",
  //           });
  //           const response = await web3.eth.getTransactionReceipt(tx.hash);
  //           if (response != null) {
  //             if (response.status) {
  //               toast.success("Transaction confirmed!");
  //               setLockLoading(false);
  //               await router.push(`/pario-lock/unlock?blockchain=${chainId}`);
  //             } else if (!response.status) {
  //               toast.error("Transaction failed!");
  //               setLockLoading(false);
  //             } else {
  //               toast.error("Something went wrong!");
  //               setLockLoading(false);
  //             }
  //           }
  //         } else {
  //           // @ts-ignore
  //           let tx = await lockContract.lock(
  //             values.useAnotherOwner ? values.ownerAddress : account,
  //             values.tokenOrLPTokenAddress,
  //             values.islp,
  //             mulDecimal(values.amount, decimals),
  //             web3.utils.toHex(moment.utc(values.lockUntil).unix()),
  //             values.title,
  //             { from: account }
  //           );
  //           await toast.promise(tx.wait, {
  //             pending: "Confirming Transaction...",
  //           });
  //           const response = await web3.eth.getTransactionReceipt(tx.hash);
  //           if (response != null) {
  //             console.log("response", response);
  //             if (response.status) {
  //               toast.success("Transaction confirmed!");
  //               setLockLoading(false);
  //               await router.push(`/pario-lock/unlock?blockchain=${chainId}`);
  //             } else if (!response.status) {
  //               toast.error("Transaction failed!");
  //               setLockLoading(false);
  //             } else {
  //               toast.error("Something went wrong!");
  //               setLockLoading(false);
  //             }
  //           }
  //         }
  //       } catch (err: any) {
  //         console.log(err, "here");
  //         toast.error(err.reason ? err.reason : err.message);
  //         setLockLoading(false);
  //       }
  //     }
  //   }
  // };

  // const { tokenInfo, loading, error } = useTokenInfo(
  //   values.tokenOrLPTokenAddress
  // );

  const { chainId } = useAuth();

  const values = form.getValues();
  console.log("values", values);
  const { tokenInfo, loading, error } = useTokenInfo(
    values.tokenOrLPTokenAddress
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitLock)}>
        <div className=" container mx-auto px-6 md:px-10 py-12 md:py-20">
          <div className=" bg-dark-1 rounded-xl px-5 md:px-10 py-8">
            <h1 className=" text-violet-1 font-bold text-3xl md:text-4xl mb-8">
              Create Lock
            </h1>
            {/* <Lock className=" text-white" /> */}
            {step == 0 && (
              <>
                <FormField
                  control={form.control}
                  name="tokenOrLPTokenAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token*</FormLabel>
                      <FormControl>
                        <div className=" flex flex-col md:flex-row items-center gap-5 mb-4">
                          <Input
                            variant="big"
                            className="md:w-[80%] lg:w-[60%]"
                            placeholder="token address ex. 0x33dD527301E6C67593c9Ae59663fdd886e39A79a"
                            {...field}
                          />
                          <Image src={networkIcon(chainId)} alt="" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {tokenInfo && (
                  <div className=" bg-dark-2 rounded-xl md:w-[90%] lg:w-[60%] px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
                    <div className=" bg-dark-1 px-4 py-4 rounded-xl text-white text-lg font-semibold">
                      Token Name :{" "}
                      <span className=" text-violet-3">{tokenInfo.name}</span>{" "}
                    </div>
                    <div className=" bg-dark-1 px-4 py-4 rounded-xl text-white text-lg font-semibold">
                      Token Symbol :{" "}
                      <span className=" text-violet-3">
                        {" "}
                        {tokenInfo.symbol}{" "}
                      </span>{" "}
                    </div>
                    <div className=" bg-dark-1 px-4 py-4 rounded-xl text-white text-lg font-semibold">
                      Token Decimals :{" "}
                      <span className=" text-violet-3">
                        {tokenInfo.decimals}
                      </span>{" "}
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
                      <span className=" text-violet-3">
                        {tokenInfo.balance}
                      </span>{" "}
                    </div>
                    <div className=" bg-dark-1 py-4 px-4 rounded-xl text-white text-lg font-semibold">
                      Token Address :{" "}
                      <span className=" text-violet-3">
                        {trimAddress(values.tokenOrLPTokenAddress)}
                      </span>{" "}
                    </div>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="useAnotherOwner"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2 my-8">
                          <Switch
                            defaultChecked={values.useAnotherOwner}
                            onCheckedChange={(value) => {
                              field.onChange(value); // Use the field's onChange to update the form state
                              console.log("Switch toggled:", value);
                            }}
                            id="useAnotherOwner"
                            name="useAnotherOwner"
                          />
                          <Label
                            htmlFor="useAnotherOwner"
                            className=" cursor-pointer"
                          >
                            Lock for someone else?
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {values.useAnotherOwner && (
                  <FormField
                    control={form.control}
                    name="ownerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receiver Address</FormLabel>
                        <FormControl>
                          <Input
                            variant="big"
                            className="md:w-[80%] lg:w-[60%]"
                            placeholder="ex. 0x33dD527301E6C67593c9Ae59663fdd886e39A79a"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <div className=" flex justify-end">
                  <Button
                    onClick={() => setStep(1)}
                    size={"lg"}
                    disabled={!tokenInfo}
                    className=" my-4 lg:block bg-violet-1 font-semibold text-base text-white hover:bg-violet-2 w-full md:w-auto"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step == 1 && (
              <>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lock Name</FormLabel>
                        <FormControl>
                          <Input
                            variant="primary"
                            placeholder="Lock Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lock Amount*</FormLabel>
                        <FormControl>
                          <Input
                            variant="primary"
                            placeholder="token amount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lockUntil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lock Until (UTC)*</FormLabel>
                        <FormControl>
                          <div>
                            <DatePicker
                              setDate={(date : Date) => {
                                field.onChange(date)
                              }}
                              buttonTitle="Lock Untill date"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div></div>
                  <FormField
                    control={form.control}
                    name="isvesting"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2 my-4">
                            <Switch
                              defaultChecked={values.useAnotherOwner}
                              onCheckedChange={(value) => {
                                field.onChange(value); // Use the field's onChange to update the form state
                              }}
                              id="isvesting"
                              name="isvesting"
                            />
                            <Label
                              htmlFor="isvesting"
                              className=" cursor-pointer"
                            >
                              Use vesting?
                            </Label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" flex justify-between gap-2">
                  <Button
                    onClick={() => setStep(0)}
                    size={"lg"}
                    className=" my-4 w-full md:w-auto lg:block bg-violet-1 font-semibold text-base text-white hover:bg-violet-2 "
                  >
                    Back
                  </Button>
                  <Button
                    size={"lg"}
                    className=" my-4 w-full md:w-auto lg:block bg-violet-1 font-semibold text-base text-white hover:bg-violet-2 "
                  >
                    Confirm
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateLocker;
