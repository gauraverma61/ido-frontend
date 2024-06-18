import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className=" container mx-auto px-6 md:px-10 py-12 md:py-20">
      <div className=" mb-20">
        <h1 className=" text-4xl md:text-5xl text-violet-2 font-bold">
          The Launchpad Protocol for Everyone
        </h1>
        <p className=" text-base md:text-lg text-white font-semibold my-10 lg:max-w-[50%]">
          PinkSale helps everyone to create their own tokens and token sales in
          few seconds. Tokens created on PinkSale will be verified and published
          on explorer websites.
        </p>
        <Link href="/create">
        <Button className="flex bg-violet-1 font-semibold text-xl text-white hover:bg-violet-2 py-6 px-8">
          Create
        </Button>
        </Link>
      </div>
      <div className=" bg-dark-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 py-14 rounded-xl ">
        <div className=" text-center lg:border-r border-violet-4">
          <div className=" text-violet-3 text-4xl mb-3">$1.5B</div>
          <div className=" text-base text-white font-medium">
            Total Liquidity Raised
          </div>
        </div>
        <div className=" text-center lg:border-r border-violet-4">
          <div className=" text-violet-3 text-4xl mb-3">29.1K</div>
          <div className=" text-base text-white font-medium">
            Total Projects
          </div>
        </div>
        <div className=" text-center lg:border-r border-violet-4">
          <div className=" text-violet-3 text-4xl mb-3">3.3M</div>
          <div className=" text-base text-white font-medium">
            Total Participants
          </div>
        </div>
        <div className=" text-center">
          <div className=" text-violet-3 text-4xl mb-3">$327.7M</div>
          <div className=" text-base text-white font-medium">
            Total Values Locked
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
