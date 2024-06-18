import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

export const menuItems = [
  { title: "Create", link: "/create" },
  { title: "List", link: "/list" },
  { title: "Locker", link: "/locker" },
  { title: "Multisender", link: "/multisender" },
];

const Header = () => {
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
      <Button className=" hidden lg:block bg-violet-1 font-semibold text-base text-white hover:bg-violet-2 ">
        Connect
      </Button>
    </div>
  );
};

export default Header;
