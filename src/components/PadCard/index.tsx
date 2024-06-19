"use client";
import React, { useMemo } from "react";
import { useIsMounted } from "usehooks-ts";

interface Iprops {}

const PadCard = (props: Iprops) => {
  const isMounted = useIsMounted();
  const isMountedValue = isMounted();

  const randomPercentage = useMemo(() => {
    if (isMountedValue) {
      return Math.random() * 100; // Generates a random percentage between 0 and 100
    } else return 0;
  }, [isMountedValue]);

  return (
    <div className=" border border-violet-1 rounded-xl overflow-hidden">
      <div className=" w-full h-[150px] bg-gray-400 relative border-b border-violet-1 ">
        <div className=" h-16 w-16  aspect-square rounded-full border border-violet-1 absolute -bottom-8 left-4 p-1 bg-violet-2">
          <div className=" h-full  aspect-square rounded-full border border-violet-1 bg-gray-400"></div>
        </div>
      </div>
      <div className="mt-8 py-2 px-4">
        <div className="text-violet-3 font-semibold text-lg">Foxmeme</div>
        <div className=" text-white text-sm">1 SOL = 10,000,000 FUF</div>
        <div className=" text-violet-3 my-2">
          <div className=" text-sm">Soft/Hard</div>
          <div className=" text-base">150 BNB - 400 BNB</div>
        </div>
        <div className="my-2">
          <div className=" mb-1.5 text-white">
            Progress ({randomPercentage?.toFixed(2)}%)
          </div>
          <div className=" w-full border border-violet-1 h-3 rounded-sm overflow-hidden mb-1">
            <div
              style={{ width: `${randomPercentage}%` }}
              className={`bg-violet-3 h-full`}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs text-white">
            <div>0 BNB</div>
            <div>100 BNB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PadCard;
