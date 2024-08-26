export function wagmiSerialize(obj: any) {

    return JSON.stringify(obj, (key, value_) => {
      console.log("stringifying wagmi serializer")
      let value = value_;
      if (typeof value === "bigint") {
        console.log("BIGINT DETECTED")

        value = { __type: "bigint", value: value_.toString() };
        console.log({value, value_});

      }
      if (value instanceof Map) {
        value = { __type: "Map", value: Array.from(value_.entries()) };
      }
      return value;
    });
}