export function replaceBigInts(input: any): any {
  if (typeof input === "bigint") {
    return input.toString();
  }

  if (Array.isArray(input)) {
    return input.map(replaceBigInts);
  }

  if (typeof input === "object" && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, replaceBigInts(value)])
    );
  }

  return input;
}
