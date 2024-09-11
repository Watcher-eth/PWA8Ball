export const REGEX = {
  // modified version of https://stackoverflow.com/a/6041965/961254 to support unicode international characters
  url: /\b(http|https):\/\/([\p{L}\p{N}_-]+(?:(?:\.[\p{L}\p{N}_-]+)+))([\p{L}\p{N}_.,@?^=%&:\/~+#-]*[\p{L}\p{N}_@?^=%&\/~+#-])/gu,
  mention: /@[\w.\-]{1,30}[\w-]/g,
  hashtag: /(#\w*[A-Za-z]\w*)/g,
  ethereumAddress: /^(0x)?[\da-f]{40}$/i,
  handle: /^[\da-z]+$/g,
  santiizeHandle: /[^\d .A-Za-z]/g,

  gm: /\bgm\b/i,
}

/**
 * Returns an array of URLs found in the specified text.
 *
 * @param text The text to get URLs from.
 * @returns An array of URLs.
 */
export default function getURLs(text: string): string[] {
  if (!text) {
    return []
  }
  return text.match(REGEX.url) || []
}
