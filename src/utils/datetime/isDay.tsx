export function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

export function isToday(someDate: Date) {
  const today = new Date()
  return isSameDay(someDate, today)
}

export function isYesterday(someDate: Date) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return isSameDay(someDate, yesterday)
}
