
export const PINATA_BASE_GATEWAY_URL = `https://<pinata_domain>.mypinata.cloud`

export const PINATA_TEST_PIN_URL = `${PINATA_BASE_GATEWAY_URL}/ipfs/<ipfs hash>`


export function getPinnedImageUrl(hash: string, width: number, height: number) {
  const baseUrl = `${PINATA_BASE_GATEWAY_URL}/ipfs/${hash}` as const

  return baseUrl//`${baseUrl}?${[width && `img-width=${width}`, height && `img-height=${height}`].filter(Boolean).join(',')}`
}

