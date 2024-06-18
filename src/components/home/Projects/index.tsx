import PadCard from "@/components/PadCard";
import React from "react";

const Projects = () => {
  return (
    <div className=" container mx-auto px-6 py-12 md:py-16">
      <h1 className=" text-white font-bold text-3xl md:text-4xl mb-8">
        Launchpads
      </h1>
      <div className="bg-dark-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5 py-5 px-5 md:px-8 rounded-xl ">
        {Array(12)
          .fill(undefined)
          .map((pad, index) => {
            return <PadCard key={index} />;
          })}
      </div>
    </div>
  );
};

export default Projects;
