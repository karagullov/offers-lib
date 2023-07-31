import { getAddress } from "@ethersproject/address";

export function isAddress(value: any): string | false {
  try {
    if (value.substring(0, 3) === "xdc") {
      value = "0x" + value.substring(3);
    }
    return getAddress(value);
  } catch {
    return false;
  }
}
