"use client";

import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { useEffect } from "react";
import { Slider } from "./components/input/Slider";
import { Select } from "./components/input/Select";
import { algorithmOptions } from "@/lib/utils";
import { SortingType } from "@/lib/types";

export default function HomePage() {
  const {
    array,
    isSorting,
    speed,
    setSpeed,
    setSelectedAlgorithm,
    selectedAlgorithm,
  } = useSortingAlgorithmContext();

  useEffect(() => {
    console.log(selectedAlgorithm);
  }, [selectedAlgorithm]);

  return (
    <main className="absolute top-0 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#150229_1px)] bg-[size:40px_40px]">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex w-full max-w-[1020px] flex-col px-4 lg:px-0"
        >
          <div className="relative flex h-[66px] w-full items-center justify-between">
            <h1 className="hidden text-2xl font-light text-zinc-300 md:flex">
              Sorting Visualizer
            </h1>
            <div className="flex items-center justify-center gap-6">
              <Slider
                isDisabled={isSorting}
                value={speed}
                handleChange={(e) => setSpeed(Number(e.target.value))}
              />
              <Select
                isDisabled={isSorting}
                defaultValue="bubble"
                options={algorithmOptions}
                onChange={(e) =>
                  setSelectedAlgorithm(e.target.value as SortingType)
                }
              />
            </div>
          </div>
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] left-0 right-0 mx-auto flex w-full items-end justify-center">
              {array.map((value, index) => (
                <div
                  key={index}
                  className="array-line default-line-color relative mx-0.5 w-1 rounded-lg opacity-70 shadow-lg"
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
