export function timeAgo(dateString: string) {
  const parsedDate = Date.parse(dateString + "Z")
  if (isNaN(parsedDate)) {
    return "Invalid date" // Handle invalid date strings gracefully
  }

  const date = new Date(parsedDate)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) === 1 ? "year" : "years"
    } ago`
  }

  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) === 1 ? "mo" : "mos"
    } ago`
  }

  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) === 1 ? "d" : "days"
    } ago`
  }

  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) === 1 ? "hr" : "hrs"
    } ago`
  }

  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) === 1 ? "min" : "mins"
    } ago`
  }

  return `${Math.floor(seconds)} ${
    Math.floor(seconds) === 1 ? "sec" : "secs"
  } ago`
}
