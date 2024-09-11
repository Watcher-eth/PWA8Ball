export function convertIpfsUrl(url: string) {
  if (url.startsWith("ipfs://")) {
    return `https://ipfs.infura.io/ipfs/${url.substring(7)}`
  }
  return url
}
