"use client";

import { SortingType } from "@/lib/types";
import { MIN_SORTING_SPEED, randomIntFromInterval } from "@/lib/utils";
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
  animationCompleted: boolean;
  setAnimationCompleted: (animationCompleted: boolean) => void;
  resetArray: () => void;
  startSorting: () => void;
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
    useState<SortingType>("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(550);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    resetArray();
    window.addEventListener("resize", resetArray);

    return () => {
      window.removeEventListener("resize", resetArray);
    };
  }, []);

  function resetArray() {
    const contentContainer = document.getElementById("content-container");

    if (!contentContainer) {
      return;
    }

    const tempArray: number[] = [];
    const numLines = contentContainer.clientWidth / 8;
    const maxLineHeight = Math.max(contentContainer.clientHeight - 340);

    for (let i = 0; i < numLines; ++i) {
      tempArray.push(randomIntFromInterval(35, maxLineHeight));
    }

    setArray(tempArray);
    setAnimationCompleted(false);
    setIsSorting(false);
  }

  function startSorting() {}

  const value = {
    array,
    setArray,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    speed,
    setSpeed,
    animationCompleted,
    setAnimationCompleted,
    resetArray,
    startSorting,
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
