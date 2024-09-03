/**
 * Converts a large numeric value (typically from blockchain transactions)
 * into a human-readable format by dividing by 10^18.
 * This is commonly used to convert wei to ether in Ethereum transactions.
 *
 * @param {bigint | string | number} value - The value to be converted, which can be a bigint, string, or number.
 * @returns {number} The value converted into a human-readable number.
 */
export function convertHuman(
  value: bigint | string | number,
  decimals: number = 18
) {
  return Number(value) / 10 ** decimals
}
