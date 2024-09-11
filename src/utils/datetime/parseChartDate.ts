import { parse, format } from "date-fns"

export function parseChartDateStr(value: string) {
  const date = parse(value, "M/d/yyyy, h:mm:ss a", new Date())
  return date
}

export function formatChartDateStr(value: string) {
  return format(parseChartDateStr(value), "MMM d h:mm")
}
