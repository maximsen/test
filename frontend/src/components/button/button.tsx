import classNames from "classnames";
import { FC, MouseEventHandler } from "react";

import "./button.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

type ButtonProps = {
  value: number;
  isActive?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Button: FC<ButtonProps> = ({ value, isActive, onClick }) => {
  const className = classNames("button", {
    "button--active": isActive,
  });

  return (
    <button className={className} onClick={onClick}>
      {formatter.format(value)}
    </button>
  );
};
