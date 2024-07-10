"use client";

import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { Slider } from "./components/input/Slider";
import { Select } from "./components/input/Select";
import { algorithmOptions, bubbleSort, qs } from "@/lib/utils";
import type { SortingType } from "@/lib/types";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const {
    array,
    isSorting,
    speed,
    selectedAlgorithm,
    sorted,
    setSorted,
    setIsSorting,
    setSpeed,
    setSelectedAlgorithm,
    setArray,
    resetArray,
  } = useSortingAlgorithmContext();

  const speedRef = useRef(speed);

  // Update the ref whenever the speed state changes
  // currently not working when sort function is in another file
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  async function sortArray(arr: number[]) {
    setIsSorting(true);
    setSorted(false);
    const lines = document.getElementsByClassName("array-line");
    const tempArray = [...arr];
    switch (selectedAlgorithm) {
      case "bubble":
        await bubbleSort(tempArray, lines, () => speedRef.current, setArray);
        break;
      case "quick":
        await qs(
          arr,
          0,
          arr.length - 1,
          () => speedRef.current,
          setArray,
          lines,
        );
        break;
      // case "merge":
      //   mergeSort(tempArray, lines, 0, tempArray.length - 1);
      //   break;
      // case "insertion":
      //   insertionSort(tempArray, lines);
      //   break;
      // case "selection":
      //   selectionSort(tempArray, lines);
      //   break;
    }

    setIsSorting(false);
    setSorted(true);
  }

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
                defaultValue={selectedAlgorithm}
                options={algorithmOptions}
                onChange={(e) =>
                  setSelectedAlgorithm(e.target.value as SortingType)
                }
              />
              <button
                className="rounded-lg bg-zinc-300 p-4 text-black"
                onClick={!sorted ? () => sortArray(array) : () => resetArray()}
                disabled={isSorting}
              >
                {!sorted ? "Start" : "Reset"}
              </button>
            </div>
          </div>
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] left-0 right-0 mx-auto flex w-full items-end justify-center">
              {/* Lines to be sorted */}
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
