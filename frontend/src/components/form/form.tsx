import { ChangeEvent, useState, useMemo } from "react";
import {
  currencyOptions,
  currencyRateMap,
  defaultCurrency,
  defaultSuggestion,
  presets,
} from "../../constants";
import { convert, round, sendDonateRequest } from "../../utils";
import { Button } from "../button";
import { CurrencySelect } from "../currency-select";
import { NumberInput } from "../number-input";

export const Form = () => {
  const [amountValue, setAmountValue] = useState(defaultSuggestion);
  const [currencyCode, setCurrencyCode] = useState(defaultCurrency);
  const onChange = (value: number) => {
    setAmountValue(value);
  };

  const preparedPresets = useMemo(
    () =>
      presets.map((value) => {
        const convertedRate = convert(value, currencyRateMap[currencyCode]);
        return {
          value,
          convertedValue:
            convertedRate !== value ? round(convertedRate) : value,
        };
      }),
    [currencyCode]
  );

  const convertCurrentAmount = (newCurrencyCode: string) => {
    const equalPreset = preparedPresets.find(
      (presetValue) => presetValue.convertedValue === amountValue
    );
    if (equalPreset) {
      setAmountValue(
        round(convert(equalPreset.value, currencyRateMap[newCurrencyCode]))
      );
      return;
    }

    const convertedAmount = convert(
      amountValue,
      currencyRateMap[newCurrencyCode],
      currencyRateMap[currencyCode]
    );
    setAmountValue(Math.ceil(convertedAmount));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value: newCurrencyCode } = e.target;
    setCurrencyCode(newCurrencyCode);
    convertCurrentAmount(newCurrencyCode);
  };

  const submit = async () => {
    const response = await sendDonateRequest({
      currency: currencyCode,
      amount: amountValue,
    });

    if (response.status >= 200 && response.status < 300) {
      alert("Thank you for your donation!");
      return;
    }

    const data = await response.json();
    alert(data.error);
  };

  return (
    <div>
      <div>
        {preparedPresets.map((preset) => (
          <Button
            onClick={() => onChange(preset.convertedValue)}
            key={preset.value}
            isActive={preset.convertedValue === amountValue}
            value={preset.convertedValue}
          />
        ))}
      </div>
      <div>
        <CurrencySelect
          value={currencyCode}
          items={currencyOptions}
          onChange={handleSelectChange}
        />
      </div>
      <div>
        <NumberInput value={amountValue} onChange={onChange} />
      </div>
      <div>
        <button onClick={submit} type="button">
          Donate
        </button>
      </div>
    </div>
  );
};
