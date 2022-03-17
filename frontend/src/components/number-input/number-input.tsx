import { FC, KeyboardEvent, ChangeEvent } from "react";

const disallowedKeyCodes = new Set(["Minus", "Period", "KeyE", "Comma"]);
const handleKeyDown = (e: KeyboardEvent) => {
  const { code } = e;

  if (disallowedKeyCodes.has(code)) {
    e.preventDefault();
  }
};

type NumberInputProps = {
  onChange: (value: number) => void;
  value: number;
};

export const NumberInput: FC<NumberInputProps> = ({ onChange, value }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      e.preventDefault();
      return;
    }

    onChange(parsedValue);
  };
  return (
    <input
      type="number"
      step={1}
      min={0}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
