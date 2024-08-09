import { getAddress } from "viem";

export function getChecksummedAddress(address: string): string {
  return address ? getAddress(address) : address;
}
