import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import React from "react";

const CreateLocker = () => {
  return (
    <div className=" container mx-auto px-6 md:px-10 py-12 md:py-20">
      <div className=" bg-dark-1 rounded-xl px-5 md:px-10 py-8">
        <h1 className=" text-violet-1 font-bold text-3xl md:text-4xl mb-2">
          Create Lock
        </h1>
        {/* <Lock className=" text-white" /> */}

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
          <Input label="Owner" variant="primary" />
          <Input />
          <Input />
          <Input />
        </div>
      </div>
    </div>
  );
};

export default CreateLocker;
