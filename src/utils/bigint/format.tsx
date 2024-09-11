/**
 * Formats a BigInt to a string with specified precision and decimal places.
 * @param {bigint} bi - The BigInt to format.
 * @param {number} nativePrecision - The native precision of the BigInt.
 * @param {number} [decimalPlaces] - The number of decimal places to display (optional).
 * @returns {string | undefined} The formatted string or undefined if input is invalid.
 */
export function formatBigIntToString(
  bi: bigint,
  nativePrecision: number,
  decimalPlaces?: number
) {
  if (typeof bi !== "bigint" && !bi) {
    return
  }
  try {
    // Check if input is zero
    if (bi === 0n) {
      return "0.0"
    }

    // Check if the input is negative
    const isNegative = bi < 0n
    if (isNegative) {
      // Convert to positive for the calculation
      bi = -bi
    }
    // Convert to string and add padding zeros if necessary
    let str = bi.toString().padStart(nativePrecision, "0")

    // Insert decimal point
    const idx = str.length - nativePrecision
    str = `${str.slice(0, idx)}.${str.slice(idx)}`

    // Handle values below zero by adding a '0' before the decimal point
    if (str.startsWith(".")) {
      str = "0" + str
    }

    // Trim to desired number of decimal places
    if (decimalPlaces !== undefined) {
      const decimalIdx = str.indexOf(".")
      str = str.slice(0, decimalIdx + decimalPlaces + 1)
    }

    // Add the negative sign back if necessary
    if (isNegative) {
      str = "-" + str
    }

    return str
  } catch (error) {
    console.log(`error`, error)
    // txErrorHandler(error)
  }
}

export function powBigInt(base: bigint, exponent: bigint | number) {
  let result = 1n
  for (let i = 0; i < exponent; i++) {
    result *= base
  }
  return result
}

/**
 * Formats a BigInt to a percentage string.
 * @param {bigint} bn - The BigInt to format.
 * @param {number} nativePrecison - The native precision of the BigInt.
 * @param {number} [decimalPlaces=2] - The number of decimal places to display (default: 2).
 * @param {boolean} [convert=true] - Whether to convert to percentage (multiply by 100) (default: true).
 * @returns {string | undefined} The formatted percentage string or undefined if an error occurs.
 */
export const formatBigIntToPercentString = (
  bn: bigint,
  nativePrecison: number,
  decimalPlaces = 2,
  convert = true
) => {
  try {
    // Calculate the conversion factor based on the native precision and required decimal places
    const conversionFactor = powBigInt(
      10n,
      BigInt(nativePrecison - 2 + decimalPlaces)
    )

    // Convert the bigint to a floating-point number, preserving the requested number of decimal places
    const percentConvert = convert ? 100 : 1
    const num = (Number(bn) * percentConvert) / Number(conversionFactor)

    // Format the number as a percentage string
    return `${num.toFixed(decimalPlaces)}%`
  } catch (error) {
    console.log(`error`, error)
    // txErrorHandler(error)
  }
}

// Some environments have issues with RegEx that contain back-tracking, so we cannot
// use them.
/**
 * Adds commas to a number string for better readability.
 * @param {string | number} [value] - The value to format.
 * @returns {string} The formatted string with commas.
 */
export function commify(value?: string | number) {
  const comps = String(value).split(".")

  if (
    comps.length > 2 ||
    !comps[0].match(/^-?[0-9]*$/) ||
    (comps[1] && !comps[1].match(/^[0-9]*$/)) ||
    value === "." ||
    value === "-."
  ) {
    console.log("invalid value", "value", value)
  }

  // Make sure we have at least one whole digit (0 if none)
  let whole = comps[0]

  let negative = ""
  if (whole.substring(0, 1) === "-") {
    negative = "-"
    whole = whole.substring(1)
  }

  // Make sure we have at least 1 whole digit with no leading zeros
  while (whole.substring(0, 1) === "0") {
    whole = whole.substring(1)
  }
  if (whole === "") {
    whole = "0"
  }

  let suffix = ""
  if (comps.length === 2) {
    suffix = "." + (comps[1] || "0")
  }
  while (suffix.length > 2 && suffix[suffix.length - 1] === "0") {
    suffix = suffix.substring(0, suffix.length - 1)
  }

  const formatted = []
  while (whole.length) {
    if (whole.length <= 3) {
      formatted.unshift(whole)
      break
    } else {
      const index = whole.length - 3
      formatted.unshift(whole.substring(index))
      whole = whole.substring(0, index)
    }
  }

  return negative + formatted.join(",") + suffix
}

/**
 * Formats a BigInt to a string with commas and specified precision and decimal places.
 * @param {bigint} bi - The BigInt to format.
 * @param {number} precision - The precision of the BigInt.
 * @param {number} [decimals=2] - The number of decimal places to display (default: 2).
 * @returns {string} The formatted string with commas.
 */
export const commifyBigIntToString = (
  bi: bigint,
  precision: number,
  decimals = 2
) => {
  return commify(formatBigIntToString(bi, precision, decimals))
}

/**
 * Formats a BigInt to a string with commas and specified decimal places, or returns "0" if the input is falsy.
 * @param {bigint} bi - The BigInt to format.
 * @param {number} decimals - The number of decimal places to display.
 * @returns {string} The formatted string with commas or "0" if input is falsy.
 */
export function commifyBigIntWithDefault(bi: bigint, decimals: number) {
  return bi ? commifyBigIntToString(bi, 18, decimals) : "0"
}
