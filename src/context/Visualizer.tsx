"use client";

import type { SortingType } from "@/lib/types";
import { randomIntFromInterval } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface SortingAlgorithmContextType {
  array: number[];
  setArray: (array: number[]) => void;
  selectedAlgorithm: SortingType;
  setSelectedAlgorithm: (algorithm: SortingType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  resetArray: () => void;
  sorted: boolean;
  setSorted: (sorted: boolean) => void;
}

const SortingAlgorithmContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

export const SortingAlgorithmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  const value = {
    array,
    setArray,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    speed,
    setSpeed,
    resetArray,
    sorted,
    setSorted,
  };

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export function useSortingAlgorithmContext() {
  const context = useContext(SortingAlgorithmContext);
  if (!context) {
    throw new Error(
      "useSortingAlgorithm must be used within a SortingAlgorithmProvider",
    );
  }
  return context;
}
