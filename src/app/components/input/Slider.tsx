import { MAX_SORTING_SPEED, MIN_SORTING_SPEED } from "@/lib/utils";

export function Slider({
  value,
  handleChange,
}: {
  value: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-center text-zinc-300">Slow</span>
      <input
        type="range"
        min={MIN_SORTING_SPEED}
        max={MAX_SORTING_SPEED}
        step={40}
        value={value}
        onChange={handleChange}
        className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700 opacity-70"
      />
      <span className="text-center text-zinc-300">Fast</span>
    </div>
  );
}
