type SwitcherOption<T> = { value: T; label: string };
export type SwitcherOptions<T> = [SwitcherOption<T>, SwitcherOption<T>];

export function Switcher<T>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: SwitcherOptions<T>;
}) {
  return (
    <div className="flex items-center space-x-2 light border border-gray-4 rounded-md font-semibold text-md bg-white">
      {options.map((option, idx) => (
        <button
          type="button"
          key={idx}
          className={`flex items-center justify-center text-sm  focus:outline-none whitespace-nowrap rounded-md font-semibold text-md py-2 px-4 w-1/2 ${
            option.value === value
              ? "text-cobalt bg-cobalt-5"
              : "text-gray-500 bg-white"
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
