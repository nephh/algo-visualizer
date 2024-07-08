"use client";

import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { useEffect } from "react";

export default function HomePage() {
  const { array, isSorting } = useSortingAlgorithmContext();

  useEffect(() => {
    console.log(array);
  }, []);

  return (
    <main className="absolute top-0 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#150229_1px)] bg-[size:40px_40px]">
      <div className="flex justify-center h-full">
        <div
          id="content"
          className="flex flex-col px-4 w-full lg:px-0 max-w-[1020px]"
        >
          <div className="flex relative justify-between items-center w-full h-[66px]">
            <h1 className="hidden text-2xl font-light md:flex text-zinc-300">
              Sorting Visualizer
            </h1>
            <div className="font-light text-zinc-300">Controls</div>
          </div>
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="flex absolute right-0 left-0 justify-center items-end mx-auto w-full bottom-[32px]">
              {array.map((value, index) => (
                <div
                  key={index}
                  className="relative mx-0.5 w-1 rounded-lg shadow-lg opacity-70 array-line default-line-color"
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
