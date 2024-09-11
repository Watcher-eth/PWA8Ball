/**
 * Performs a single iteration of the Newton-Raphson method for square root approximation.
 * @param n The number to find the square root of
 * @param x0 The current approximation of the square root
 * @returns The next approximation of the square root
 */
function newtonIteration(n: bigint, x0: bigint): bigint {
  const x1 = (n / x0 + x0) >> 1n
  if (x0 === x1 || x0 === x1 - 1n) {
    return x0
  }
  return newtonIteration(n, x1)
}

/**
 * Calculates the integer square root of a bigint value using the Newton-Raphson method.
 * @param value The bigint value to calculate the square root of
 * @returns The integer square root of the input value
 * @throws {Error} If the input value is negative
 */
export function sqrt(value: bigint): bigint {
  if (value < 0n) {
    throw new Error("Cannot compute square root of a negative number")
  }
  if (value < 2n) {
    return value
  }

  return newtonIteration(value, 1n)
}
