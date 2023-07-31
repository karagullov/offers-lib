export enum AtomxChainId {
  // XDC_TEST = 51,
  XDC_PROD = 50,
  // BSC_TEST = 97,
  BSC_PROD = 56,
  // POLYGON_TEST = 80001,
  POLYGON_PROD = 137,
}

const { BSC_PROD, POLYGON_PROD, XDC_PROD } = AtomxChainId;

export interface L1ChainInfo {
  readonly blockWaitMsBeforeWarning?: number;
  readonly docs: string;
  readonly explorer: string;
  readonly infoLink: string;
  readonly label: string;
  readonly logoUrl: string;
  readonly rpcUrls: string[];
  readonly chainId: AtomxChainId;
  readonly nativeCurrency: {
    name: string; // 'Goerli ETH',
    symbol: string; // 'gorETH',
    decimals: number; //18,
  };
}

export const ATOMX_ALL_SUPPORTED_CHAIN_IDS = [XDC_PROD, POLYGON_PROD];
export type SupportedL1ChainId = (typeof ATOMX_ALL_SUPPORTED_CHAIN_IDS)[number];

export type ChainInfo = { readonly [chainId: number]: L1ChainInfo } & {
  readonly [chainId in SupportedL1ChainId]: L1ChainInfo;
};

export const TOKEN_LIST_REPO = (chainId: AtomxChainId) =>
  `https://raw.githubusercontent.com/pro100skm/atomx-token-list/master/chains/${chainId}`;

export const ATOMX_CHAIN_INFO: ChainInfo = {
  [XDC_PROD]: {
    docs: "https://howto.xinfin.org/",
    explorer: "https://explorer.xinfin.network",
    infoLink: "https://xinfin.network/",
    label: "XinFin",
    logoUrl: `${TOKEN_LIST_REPO(XDC_PROD)}/logo.png`,
    rpcUrls: ["/rpc-xdc-mainnet", "https://erpc.xinfin.network"],
    chainId: XDC_PROD,
    nativeCurrency: {
      name: "XDC",
      symbol: "XDC",
      decimals: 18,
    },
  },
  // [XDC_TEST]: {
  //   docs: 'https://howto.xinfin.org/',
  //   explorer: 'https://explorer.apothem.network',
  //   infoLink: 'https://xinfin.network/',
  //   label: 'Apothem',
  //   logoUrl: `${TOKEN_LIST_REPO(XDC_TEST)}/logo.png`,
  //   rpcUrls: ['/rpc-xdc-testnet', 'https://erpc.apothem.network'],
  //   chainId: XDC_TEST,
  //   nativeCurrency: {
  //     name: 'XDC',
  //     symbol: 'XDC',
  //     decimals: 18,
  //   },
  // },
  [BSC_PROD]: {
    docs: "",
    explorer: "https://bscscan.com/",
    infoLink: "https://bscscan.com/",
    label: "BSC Mainnet",
    logoUrl: "https://bscscan.com/images/svg/brands/bnb.svg",
    // logoUrl: `${TOKEN_LIST_REPO(XDC_TEST)}/logo.png`,
    rpcUrls: ["/rpc-bsc-mainnet", "https://bsc-dataseed1.binance.org"],
    chainId: BSC_PROD,
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
  },
  // [BSC_TEST]: {
  //   docs: '',
  //   explorer: 'https://testnet.bscscan.com/',
  //   infoLink: 'https://bscscan.com/',
  //   label: 'BSC Testnet',
  //   logoUrl: 'https://bscscan.com/images/svg/brands/bnb.svg',
  //   rpcUrls: ['/rpc-bsc-testnet', 'https://data-seed-prebsc-1-s1.binance.org:8545'],
  //   chainId: BSC_TEST,
  //   nativeCurrency: {
  //     name: 'BNB',
  //     symbol: 'BNB',
  //     decimals: 18,
  //   },
  // },
  // [POLYGON_TEST]: {
  //   docs: '',
  //   explorer: 'https://mumbai.polygonscan.com/',
  //   infoLink: '',
  //   label: 'Mumbai',
  //   logoUrl:
  //     'https://europe1.discourse-cdn.com/business20/uploads/polygon1/original/1X/9a8958e80d8390e320481495ad9837b2fa194861.png',
  //   rpcUrls: [
  //     'https://polygon-mumbai.g.alchemy.com/v2/mMrgoqqLUV77lZJ25jhA2KVm6xxVDUG4',
  //     'https://polygon-mumbai.g.alchemy.com/v2/mMrgoqqLUV77lZJ25jhA2KVm6xxVDUG4',
  //   ],
  //   chainId: POLYGON_TEST,
  //   nativeCurrency: {
  //     name: 'MATIC',
  //     symbol: 'MATIC',
  //     decimals: 18,
  //   },
  // },
  [POLYGON_PROD]: {
    docs: "",
    explorer: "https://polygonscan.com/",
    infoLink: "",
    label: "Polygon",
    logoUrl:
      "https://europe1.discourse-cdn.com/business20/uploads/polygon1/original/1X/9a8958e80d8390e320481495ad9837b2fa194861.png",
    rpcUrls: [
      "https://polygon.llamarpc.com",
      "https://rpc-mainnet.matic.quiknode.pro",
    ],
    chainId: POLYGON_PROD,
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
};

export const ATOMX_NATIVE_CURRENCIES: { [key in AtomxChainId]: string } =
  ATOMX_ALL_SUPPORTED_CHAIN_IDS.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: ATOMX_CHAIN_INFO[curr].nativeCurrency.symbol,
    }),
    {} as { [key in AtomxChainId]: string }
  );
