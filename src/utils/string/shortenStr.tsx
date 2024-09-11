// @ts-nocheck
export function shortenStr(str?: string, chars = 4) {
  if (str?.length > chars + 1) {
    const start = str.slice(0, chars)
    return `${start}...`
  } else {
    return str
  }
}
