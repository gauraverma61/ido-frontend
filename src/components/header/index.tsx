"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import ConnectDialog from "../connectDialog";
import useAuth from "@/hooks/useAuth";
import { trimAddress } from "@/lib/utils";
import NetworkDialog from "../networkDialog";

export const menuItems = [
  { title: "Create", link: "/create" },
  { title: "List", link: "/list" },
  { title: "Locker", link: "/locker" },
  { title: "Multisender", link: "/multisender" },
];

const Header = () => {
  const { chainId, account, chains, disconnect } = useAuth();
  console.log("Account: ", chainId, account, chains);

  return (
    <div className=" h-[60px] md:h-[70px] bg-dark-1 flex items-center justify-between px-6 md:px-10 lg:px-24">
      <Menu className=" lg:hidden text-white" />
      <div className=" flex items-center gap-32">
        <Link href={"/"}>
          <h1 className=" text-2xl lg:text-3xl font-bold text-white hover:text-violet-2 cursor-pointer transition-all">
            DarkSALE
          </h1>
        </Link>
        <nav className="hidden lg:block">
          <ul className=" text-base text-white font-semibold cursor-pointer flex items-center gap-10">
            {menuItems.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  <li className="hover:text-violet-3">{item.title}</li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="lg:hidden w-6"></div>
      <div className=" hidden lg:block">
      {account ? (
        <div className=" flex items-center gap-3">
          <NetworkDialog/>
          <div className=" text-white font-semibold border border-white px-4 py-2 rounded">
            {trimAddress(account)}
          </div>
          <Link href={"/me"}>
            <span className=" aspect-square px-2 rounded-full center border-2 border-gray-300 ">
              <User color="white" />
            </span>
          </Link>
        </div>
      ) : (
        <ConnectDialog />
      )}
      </div>
    </div>
  );
};

export default Header;
