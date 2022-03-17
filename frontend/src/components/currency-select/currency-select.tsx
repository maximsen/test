import { FC, ChangeEventHandler } from "react";

type CurrencySelectProps = {
  value: string;
  items: {
    text: string;
    value: string;
  }[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export const CurrencySelect: FC<CurrencySelectProps> = ({
  value,
  items,
  onChange,
}) => {
  return (
    <select id="lang" onChange={onChange} value={value}>
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};
