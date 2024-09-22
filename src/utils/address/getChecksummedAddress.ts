import { getAddress } from "viem"

export function getChecksummedAddress(address: string): string {
  return address?.length > 2 ? getAddress(address) : address
}
