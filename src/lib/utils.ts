export const MIN_SORTING_SPEED = 6;
export const MAX_SORTING_SPEED = 246;

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, (1 / ms) * 1000));
}

export const algorithmOptions = [
  { value: "bubble", label: "Bubble Sort" },
  { value: "quick", label: "Quick Sort" },
  // { value: "merge", label: "Merge Sort" },
  // { value: "insertion", label: "Insertion Sort" },
  // { value: "selection", label: "Selection Sort" },
];

export async function bubbleSort(
  arr: number[],
  getSpeed: () => number,
  setArray: (arr: number[]) => void,
  lines: HTMLCollectionOf<Element>,
) {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length - 1 - i; ++j) {
      lines[j + 1]!.classList.add("changed-line-color");
      if (arr[j]! >= arr[j + 1]!) {
        const temp = arr[j];
        arr[j] = arr[j + 1]!;
        arr[j + 1] = temp!;

        setArray([...arr]);
        await delay(getSpeed());
      }
      lines[j + 1]!.classList.remove("changed-line-color");
    }
    lines[arr.length - 1 - i]!.classList.add("changed-line-color");
  }
}

export async function qs(
  arr: number[],
  low: number,
  high: number,
  getSpeed: () => number,
  setArray: (arr: number[]) => void,
  lines: HTMLCollectionOf<Element>,
) {
  if (low >= high) {
    return;
  }

  const pivotIdx = await partition(arr, low, high, getSpeed, setArray, lines);

  await qs(arr, low, pivotIdx - 1, getSpeed, setArray, lines);
  await qs(arr, pivotIdx + 1, high, getSpeed, setArray, lines);
}

async function partition(
  arr: number[],
  low: number,
  high: number,
  getSpeed: () => number,
  setArray: (arr: number[]) => void,
  lines: HTMLCollectionOf<Element>,
) {
  const pivot = arr[high];
  let idx = low - 1;

  for (let i = low; i < high; i++) {
    if (arr[i]! <= pivot!) {
      idx++;
      const temp = arr[i];
      arr[i] = arr[idx]!;
      arr[idx] = temp!;
      setArray([...arr]);
      await delay(getSpeed());
    }
  }

  idx++;
  arr[high] = arr[idx]!;
  arr[idx] = pivot!;
  setArray([...arr]);

  return idx;
}

export async function quicksort(
  arr: number[],
  getSpeed: () => number,
  setArray: (arr: number[]) => void,
  lines: HTMLCollectionOf<Element>,
) {
  await qs(arr, 0, arr.length - 1, getSpeed, setArray, lines);
}
