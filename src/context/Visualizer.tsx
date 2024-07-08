"use client";

import { SortingType } from "@/lib/types";
import { createContext, useContext, useState } from "react";

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
    const [array, setArray] = useState<number[]>([100, 300, 200, 500, 400, 600, 700]);
    const [selectedAlgorithm, setSelectedAlgorithm] =
        useState<SortingType>("bubble");
    const [isSorting, setIsSorting] = useState(false);
    const [speed, setSpeed] = useState(100);
    const [animationCompleted, setAnimationCompleted] = useState(false);

    function resetArray() {}

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
