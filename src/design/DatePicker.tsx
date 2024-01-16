import dayjs from "dayjs";
import { useMemo, useState } from "react";

export function DatePicker({
  value,
  onChange,
}: {
  value: Date;
  onChange: (value: Date | undefined) => void;
}) {
  const inputValue = useMemo(() => parseFromDate(value), [value]);
  const [focused, setFocused] = useState(false);

  return (
    <input
      type={"date"}
      className={`text-base font-normal text-gray-13 placeholder:text-gray-9 px-6 py-4 rounded-lg block w-full focus:border-gray-10 
          ${
            focused
              ? "bg-white border-gray-9 focus:ring-0 border border-gray-5"
              : "border border-gray-5 bg-white active:border-2 active:border-gray-9 active:bg-white hover:border hover:border-gray-8 focus:ring-cobalt-3 focus:ring-[3px] focus:ring-offset-[1.5px]"
          }`}
      onChange={(e) => {
        onChange(parseToDate(e.target.value));
      }}
      onBlur={() => {
        setFocused(false);
      }}
      onFocus={() => setFocused(true)}
      autoFocus={true}
      autoComplete={"off"}
      value={inputValue}
    />
  );
}

function parseToDate(domValue: string): Date | undefined {
  const parsedDate = dayjs(domValue, "YYYY-MM-DD");
  if (!parsedDate.isValid() || parsedDate.format("YYYY-MM-DD") !== domValue) {
    return undefined;
  }

  return parsedDate.toDate();
}

function parseFromDate(dateObj: Date): string {
  return dateObj ? dayjs(dateObj).format("YYYY-MM-DD") : "";
}
