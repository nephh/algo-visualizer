import type { SelectOptionType } from "@/lib/types";

export function Select({
  options,
  defaultValue,
  onChange,
  isDisabled,
}: {
  options: SelectOptionType[];
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled: boolean;
}) {
  return (
    <div className="inline-block relative w-48">
      <select
        className="block p-2.5 w-full text-sm bg-zinc-200 rounded-lg border border-gray-300"
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={isDisabled}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
