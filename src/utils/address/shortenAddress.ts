
export function shortenAddress(address: string) {
  if (!address || address.length < 11) {
    throw new Error("Invalid address");
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}


export function shortenAddressLong(address: string) {
  if (!address || address.length < 11) {
    throw new Error("Invalid address");
  }
  return `${address.slice(0, 14)}...${address.slice(-4)}`;
}
