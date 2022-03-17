export const round = (value: number) => {
  const k = 10 ** Math.max(value.toFixed(0).length - 1, 1) / 2;
  return Math.round(value / k) * k;
};

export const convert = (value: number, to: number, from: number = 1) =>
  (value * to) / from;

export const sendDonateRequest = (data: { currency: string; amount: number }) =>
  fetch("/donate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
