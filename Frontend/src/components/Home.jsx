import React from "react";
import phonk from "../assets/phonker.png";

const Home = () => {
  return (
    <div className="bg-red-200 min-h-[100vh] flex justify-center items-center p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center max-w-screen-lg w-full">
        {/* Right Section */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img src={phonk} alt="Podcast Mic" className="h-96 w-96" />
        </div>

        {/* Left Section */}
        <div className="flex flex-col gap-2 text-center md:text-left md:w-2/4">
          <h1 className="text-6xl sm:text-5xl md:text-7xl font-bold">
            Create & listen to the
          </h1>
          <h1 className="text-6xl sm:text-5xl md:text-7xl font-bold flex justify-center md:justify-start items-center">
            Ph0nk
          </h1>
          <p className="text-xs">
            Listen to the most popular phonks on just one platform -{" "}
            <span className="font-bold">PHONKMASTER</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
