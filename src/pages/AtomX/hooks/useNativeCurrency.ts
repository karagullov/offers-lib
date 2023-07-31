import { Currency, NativeCurrency, Token } from "@uniswap/sdk-core";
import { useMemo } from "react";

import {
  ATOMX_CHAIN_INFO,
  AtomxChainId,
} from "../interfaces/atomx.chain.interface";

const { BSC_PROD, POLYGON_PROD, XDC_PROD } = AtomxChainId;

export const WETH_ADDRESS: { [chainId in AtomxChainId]: string } = {
  [XDC_PROD]: "0x951857744785E80e2De051c32EE7b25f9c458C42",
  [BSC_PROD]: "",
  [POLYGON_PROD]: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
};

export const WETH_CONFIG: {
  [chainId: number]: {
    chainId: number;
    address: string;
    decimals: number;
    symbol: string;
    name: string;
  };
} = {
  [XDC_PROD]: {
    chainId: XDC_PROD,
    address: WETH_ADDRESS[XDC_PROD],
    decimals: 18,
    symbol: "WXDC",
    name: "Wrapped XDC",
  },
  [POLYGON_PROD]: {
    chainId: POLYGON_PROD,
    address: WETH_ADDRESS[POLYGON_PROD],
    decimals: 18,
    symbol: "WMATIC",
    name: "Wrapped MATIC",
  },
};

const getTokenConf = (cId: AtomxChainId) =>
  new Token(
    WETH_CONFIG[cId].chainId,
    WETH_CONFIG[cId].address,
    WETH_CONFIG[cId].decimals,
    WETH_CONFIG[cId].symbol,
    WETH_CONFIG[cId].name
  );
export const WETH_EXTENDED: { [chainId: number]: Token } = {
  [XDC_PROD]: getTokenConf(XDC_PROD),
  [POLYGON_PROD]: getTokenConf(POLYGON_PROD),
};

export class ExtendedETH extends NativeCurrency {
  protected constructor(chainId: number) {
    super(
      chainId,
      18,
      ATOMX_CHAIN_INFO[chainId].nativeCurrency.symbol,
      ATOMX_CHAIN_INFO[chainId].nativeCurrency.name
    );
  }
  get wrapped(): Token {
    if (this.chainId in WETH_EXTENDED) {
      return WETH_EXTENDED[this.chainId];
    }
    throw new Error("Unsupported chain ID");
  }

  private static _cachedXDC: { [chainId: number]: ExtendedETH } = {};
  static onChain(chainId: number): ExtendedETH {
    return (
      this._cachedXDC[chainId] ??
      (this._cachedXDC[chainId] = new ExtendedETH(chainId))
    );
  }

  equals(other: Currency): boolean {
    return (
      other.isNative &&
      other.symbol === this.symbol &&
      other.chainId === this.chainId
    );
  }
}

export const useExtendedCurrency = (chainId?: AtomxChainId) => {
  if (!chainId) return null;
  return ExtendedETH;
};

export const useNativeCurrency = (
  chainId: AtomxChainId
): Currency | null | undefined => {
  const ExtendedCurrency = useExtendedCurrency(chainId);

  const extendedEther = useMemo(() => {
    if (!ExtendedCurrency || !chainId || !ATOMX_CHAIN_INFO[chainId])
      return null;
    return ExtendedCurrency.onChain(chainId);
  }, [chainId, ExtendedCurrency]);

  return extendedEther;
};
