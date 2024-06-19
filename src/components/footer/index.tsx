import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className=" bg-dark-1  py-12">
      <div className="container mx-auto">
        <div className="text-white text-center text-sm pb-10 mb-10 border-b border-violet-4">
          Disclaimer: DarkSale will never endorse or encourage that you invest
          in any of the projects listed and therefore, accept no liability for
          any loss occasioned. It is the user(s) responsibility to do their own
          research and seek financial advice from a professional. More
          information about (DYOR) can be found via Binance Academy.
        </div>
        <div className=" flex items-center justify-between ">
          <div>
            <h1 className=" text-2xl lg:text-3xl font-bold text-white hover:text-violet-2 cursor-pointer transition-all mb-2">
              DarkSALE
            </h1>
            <p className=" text-white text-sm font-medium max-w-[70%]">
              DarkSale helps everyone to create their own tokens and token sales
              in few seconds.
            </p>
          </div>
          <div className=" text-white flex items-center justify-between gap-10">
            <Twitter className="cursor-pointer" />
            <Facebook className="cursor-pointer" />
            <Instagram className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
