export const isMobile = () => {
  if (typeof navigator === "undefined") return false
  return /Mobi|Android/i.test(navigator.userAgent)
}
