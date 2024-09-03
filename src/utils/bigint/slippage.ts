import _ from "lodash"


export function addSlippage(amount: bigint, slippage: number) {
  return BigInt(
    _.round(Number(amount) * (1 + slippage))
  )
}

export function subtractSlippage(amount: bigint, slippage: number) {
  return addSlippage(amount, -slippage)
}
