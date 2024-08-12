export function formatAmountWithCommas(value: number | string): string {
  // Convert the input to a string
  const strValue = value.toString();

  // Split the value into integer and fractional parts
  const [integerPart, fractionalPart] = strValue.split(".");

  // Regular expression to add commas every three digits
  const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the formatted string with fractional part if it exists
  return fractionalPart ? `${withCommas}.${fractionalPart}` : withCommas;
}
