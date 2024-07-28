import Link from "next/link";
import React from "react";

const Locker = () => {
  return (
    <div className=" container mx-auto px-6 md:px-10 py-12 md:py-20">
      <div className=" bg-dark-1 rounded-xl px-5 md:px-10 py-8">
        <h1 className=" text-violet-1 font-bold text-3xl md:text-4xl mb-2">
          Locker
        </h1>
        <div className="grid grid-cols-2 gap-4 w-full my-10">
          <Link href="/lock/create">
            <div className=" text-white text-4xl font-semibold bg-dark-2 text-center py-20 rounded-xl cursor-pointer ">
              Create Lock
            </div>
          </Link>
          <Link href="/lock/lockers">
            <div className=" text-white text-4xl font-semibold bg-dark-2 text-center py-20 rounded-xl cursor-pointer">
              Lockers
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Locker;
