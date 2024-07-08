export const MIN_SORTING_SPEED = 100;
export const MAX_SORTING_SPEED = 1000;

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const algorithmOptions = [
  { value: "bubble", label: "Bubble Sort" },
  { value: "quick", label: "Quick Sort" },
  { value: "merge", label: "Merge Sort" },
  { value: "insertion", label: "Insertion Sort" },
  { value: "selection", label: "Selection Sort" },
];
