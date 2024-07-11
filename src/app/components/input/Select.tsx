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
    <div className="relative inline-block w-48">
      <select
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
