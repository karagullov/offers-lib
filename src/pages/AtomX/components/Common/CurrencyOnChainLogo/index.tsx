import Logo from "components/Common/Logo";
import {
  ATOMX_CHAIN_INFO,
  AtomxChainId,
} from "pages/AtomX/interfaces/atomx.chain.interface";
import { useMemo } from "react";
import { WrappedTokenInfo } from "state/wrappedTokenInfo";
import styled from "styled-components/macro";

const CurrencyOnChainLogoWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const ChainLogoWrapper = styled.div<{ size: number }>`
  position: absolute;
  right: ${({ size }) => `-${size / 3}px`};
  top: ${({ size }) => `-${size / 3}px`};

  padding: 3px;

  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.bg1};
  border-radius: 50%;
`;

const ChainLogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background: radial-gradient(
    white 50%,
    #ffffff00 calc(75% + 1px),
    #ffffff00 100%
  );

  border-radius: 50%;
  -mox-box-shadow: 0 0 1px white;
  -webkit-box-shadow: 0 0 1px white;
  box-shadow: 0 0 1px white;
  border: 0 solid rgba(255, 255, 255, 0);
`;

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background: radial-gradient(
    white 50%,
    #ffffff00 calc(75% + 1px),
    #ffffff00 100%
  );
  border-radius: 50%;
  -mox-box-shadow: 0 0 1px black;
  -webkit-box-shadow: 0 0 1px black;
  box-shadow: 0 0 1px black;
  border: 0 solid rgba(255, 255, 255, 0);
`;

export const getTokenLogoURL = (
  address: string,
  chainId: AtomxChainId
): string => {
  return `https://raw.githubusercontent.com/pro100skm/atomx-token-list/master/chains/${chainId}/assets/${address}/logo.png`;
};

export default function CurrencyLogo({
  currency,
  size = "24px",
  style,
  ...rest
}: {
  currency: {
    isNative: boolean;
    isToken: boolean;
    address: string;
    chainId: AtomxChainId;
    symbol: string;
  };
  //  Currency | TokenInfo | null
  size?: string;
  style?: React.CSSProperties;
}) {
  const uriLocations = [""];
  // useHttpLocations(
  //   // currency instanceof WrappedTokenInfo ? currency.logoURI :
  //   undefined,
  // );

  const srcs: string[] = useMemo(() => {
    if (!currency || currency.isNative) return [];

    if (currency.isToken) {
      const defaultUrls = [];
      const url = getTokenLogoURL(currency.address, currency.chainId);
      if (url) {
        defaultUrls.push(url);
      }
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls];
      }
      return defaultUrls;
    }
    return [];
  }, [currency, uriLocations]);

  const { logoUrl } = ATOMX_CHAIN_INFO[currency.chainId];
  if (currency?.isNative) {
    return (
      <StyledEthereumLogo
        src={logoUrl}
        alt="xdc logo"
        size={size}
        style={style}
        {...rest}
      />
    );
  }

  return (
    <StyledLogo
      size={size}
      srcs={srcs}
      alt={`${currency?.symbol ?? "token"} logo`}
      style={style}
      {...rest}
    />
  );
}

type CurrencyOnChainLogoProps = {
  tokenInfo: {
    isNative: boolean;
    isToken: boolean;
    address: string | undefined;
    chainId: AtomxChainId;
    symbol: string;
  };
  pixelSize?: number;
};

export function CurrencyOnChainLogo({
  tokenInfo,
  pixelSize = 32,
}: CurrencyOnChainLogoProps) {
  const chainInfo = ATOMX_CHAIN_INFO[tokenInfo.chainId];

  return (
    <CurrencyOnChainLogoWrapper>
      <CurrencyLogo
        currency={{
          isNative: tokenInfo.isNative,
          isToken: tokenInfo.isToken,
          address: tokenInfo.address || tokenInfo.symbol,
          chainId: tokenInfo.chainId,
          symbol: tokenInfo.symbol as string,
        }}
        size={`${pixelSize}px`}
      />
      <ChainLogoWrapper data-tooltip={chainInfo.label} size={pixelSize / 1.5}>
        <ChainLogoImg src={chainInfo.logoUrl} alt={chainInfo.label} />
      </ChainLogoWrapper>
    </CurrencyOnChainLogoWrapper>
  );
}
