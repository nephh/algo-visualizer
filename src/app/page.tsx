"use client";

import { Slider } from "./components/input/Slider";
import { Select } from "./components/input/Select";
import {
  algorithmOptions,
  bubbleSort,
  qs,
  quicksort,
  randomIntFromInterval,
} from "@/lib/utils";
import type { SortingType } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const [array, setArray] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingType>("quick");
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(126);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    resetArray();
    window.addEventListener("resize", resetArray);

    return () => {
      window.removeEventListener("resize", resetArray);
    };
  }, []);

  const speedRef = useRef(speed);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Would be nice to make the sorting stop if we reset the array
  function resetArray() {
    const contentContainer = document.getElementById("content-container");

    if (!contentContainer) {
      return;
    }

    const tempArray: number[] = [];
    const numLines = contentContainer.clientWidth / 8;
    const maxLineHeight = Math.max(contentContainer.clientHeight - 340);

    const lines = document.getElementsByClassName("array-line");
    for (let i = 0; i < numLines; ++i) {
      tempArray.push(randomIntFromInterval(31, maxLineHeight));
    }

    for (const line of lines) {
      line.classList.remove("changed-line-color");
    }

    setArray(tempArray);
    setSorted(false);
    setIsSorting(false);
  }

  async function sortArray(arr: number[]) {
    setIsSorting(true);
    setSorted(false);
    const lines = document.getElementsByClassName("array-line");
    switch (selectedAlgorithm) {
      case "bubble":
        await bubbleSort(arr, () => speedRef.current, setArray, lines);
        break;
      case "quick":
        await quicksort(arr, () => speedRef.current, setArray, lines);
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
