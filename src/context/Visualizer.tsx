"use client";

import type { AnimationArrayType, SortingType } from "@/lib/types";
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
  startSorting: (animations: AnimationArrayType) => void;
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

  const startSorting = (animations: AnimationArrayType) => {
    setIsSorting(true);

    const inverseSpeed = (1 / speed) * 200;
    const arrLines = document.getElementsByClassName(
      "array-line",
    ) as HTMLCollectionOf<HTMLElement>;

    const updateClassList = (
      indexes: number[],
      addClassName: string,
      removeClassName: string,
    ) => {
      indexes.forEach((index) => {
        if (!arrLines[index]) {
          return;
        }

        arrLines[index].classList.add(addClassName);
        arrLines[index].classList.remove(removeClassName);
      });
    };

    const updateHeightValue = (
      lineIndex: number,
      newHeight: number | undefined,
    ) => {
      if (!arrLines[lineIndex]) {
        return;
      }

      arrLines[lineIndex].style.height = `${newHeight}px`;
    };

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [lineIndexes, isSwap] = animation;
        if (!isSwap) {
          updateClassList(
            lineIndexes,
            "change-line-color",
            "default-line-color",
          );
          setTimeout(
            () =>
              updateClassList(
                lineIndexes,
                "default-line-color",
                "change-line-color",
              ),
            inverseSpeed,
          );
        } else {
          const [lineIndex, newHeight] = lineIndexes;
          if (!lineIndex) {
            return;
          }

          updateHeightValue(lineIndex, newHeight);
        }
      }, index * inverseSpeed);
    });

    const finalTimeout = animations.length * inverseSpeed;
    setTimeout(() => {
      Array.from(arrLines).forEach((line) => {
        line.classList.add("pulse-animation", "change-line-color");
        line.classList.remove("default-line-color");
      });

      setTimeout(() => {
        Array.from(arrLines).forEach((line) => {
          line.classList.remove("pulse-animation", "change-line-color");
          line.classList.add("default-line-color");
        });
        setIsSorting(false);
        setAnimationCompleted(true);
      }, 1000);
    }, finalTimeout);
  };

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
