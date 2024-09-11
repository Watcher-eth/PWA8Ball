import { toast } from "sonner"

function checkStringForRejection(str: string) {
  return (
    str.includes("user rejected transaction") ||
    str.includes("User denied transaction")
  )
}

function checkStringForNotEnoughGas(str: string) {
  return str.includes("insufficient funds for gas")
}

export function txErrorHandler(err: any) {
  console.log("err from txErrorHandler: ", err)

  if (err?.details && checkStringForRejection(err?.details)) {
    return toast.error("User denied transaction", {
      id: "toast-error-user-reject",
      duration: 5000,
    })
  } else if (err?.details && checkStringForNotEnoughGas(err?.details)) {
    return toast.error("Transaction reverted: not enough gas", {
      id: "toast-error-not-enough-gas",
      duration: 5000,
    })
  } else if (
    err.code === 4001 ||
    (err?.message && checkStringForRejection(err?.message))
  ) {
    // EIP-1193 userRejectedRequest error
    return toast.error("User denied transaction", {
      id: "toast-error-user-reject",
      duration: 5000,
    })
  } else if (err.code === -32603) {
    if (err.data?.code === -32000) {
      return toast.error(
        <div className="w-full">
          Transaction reverted: Insufficient gas to execute transaction
        </div>,
        {
          id: "toast-error-not-enough-gas",
          duration: 10000, // Sonner uses 0 for infinite duration
        }
      )
    }
  }

  return toast.error(err?.message, {
    id: "toast-error",
    duration: 5000,
  })
}

export function txErrorHandlerWrapper(txFunc: Function) {
  async function wrappedTxFunc(...args: any[]) {
    try {
      return await txFunc(...args)
    } catch (err) {
      console.log("err from txErrorHandlerWrapper: ", err)
      txErrorHandler(err)
      return err
    }
  }

  return wrappedTxFunc
}
