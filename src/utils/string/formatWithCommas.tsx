export function formatWithCommas(value: string) {
  // Remove all commas
  let newValue = value.replace(/,/g, "");

  // Split the value into integer and decimal parts
  const parts = newValue.split(".");
  let integerPart = parts[0] || "";
  let decimalPart = parts[1] || "";

  // Limit the decimal part to two digits
  decimalPart = decimalPart.slice(0, 2);

  // Add commas for thousands, millions, etc. to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the integer and decimal parts with a decimal point
  newValue = integerPart + (decimalPart ? "." + decimalPart : "");

  return newValue;
}
