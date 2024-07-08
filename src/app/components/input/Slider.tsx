import { MAX_SORTING_SPEED, MIN_SORTING_SPEED } from "@/lib/utils";

export function Slider({
  value,
  handleChange,
  isDisabled = false,
}: {
  value: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}) {
  return (
    <div className="flex gap-2 justify-center items-center">
      <span className="text-center text-zinc-300">Slow</span>
      <input
        type="range"
        min={MIN_SORTING_SPEED}
        max={MAX_SORTING_SPEED}
        step={10}
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        className="w-full h-2 rounded-lg opacity-70 appearance-none cursor-pointer slider bg-zinc-700"
      />
      <span className="text-center text-zinc-300">Fast</span>
    </div>
  );
}
