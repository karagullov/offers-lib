import { formatUnits } from "@ethersproject/units";
import { TokenInfo } from "@uniswap/token-lists/src/types";
import { AtomX } from "pages/AtomX/constants";
import { useNativeCurrency } from "pages/AtomX/hooks/useNativeCurrency";
import { AtomxChainId } from "pages/AtomX/interfaces/atomx.chain.interface";
import { useState } from "react";
import { Order } from "state/order/types";
import styled from "styled-components/macro";

import { CurrencyOnChainLogo } from "../Common/CurrencyOnChainLogo";
import { LoadingDiv } from "../Common/Div";
import { DefaultFlex } from "../Common/Flex";
import { LoadingCircle } from "../Common/Loader/styled";
import { OrderTd } from "./styles";
import { ButtonSecondary } from "components/Common/Button";

const StyledLink = styled.a`
  width: 100%;
  display: block;
  cursor: pointer;
`;

export const Anchor = styled.a`
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
  }
  &:active,
  &:focus {
    opacity: 0.4;
  }
`;

const tgTextLength = 7;

function TelegramLink({ telegram }: { telegram: string }) {
  let displayTgText = `@${telegram.substring(0, tgTextLength)}`;
  if (displayTgText.length < telegram.length) displayTgText += "...";

  return (
    <Anchor href={`https://t.me/${telegram}`} target="_blank" rel="noreferrer">
      {displayTgText}
    </Anchor>
  );
}

type OrderRowProps = {
  order: Order;
  isOwner?: boolean;
  onDelete?: () => void;
  map: { [chainId: number]: { [tokenAddress: string]: TokenInfo } };
};

export function OrderRow({ order, isOwner, onDelete, map }: OrderRowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const nativeSellToken = useNativeCurrency(
    +order.sell.chainId as AtomxChainId
  );
  const nativeBuyToken = useNativeCurrency(+order.buy.chainId as AtomxChainId);

  if (!map[order.sell.chainId] || !map[order.buy.chainId]) {
    return null;
  }
  const sellInfo =
    nativeSellToken?.name === order.sell.token
      ? nativeSellToken
      : map[order.sell.chainId][order.sell.token];
  const buyInfo =
    nativeBuyToken?.name === order.buy.token
      ? nativeBuyToken
      : map[order.buy.chainId][order.buy.token];

  if (
    !map[order.sell.chainId] ||
    !map[order.buy.chainId] ||
    !sellInfo ||
    !buyInfo
  )
    return null;

  const sellAmount = formatUnits(order.sell.amount, sellInfo.decimals);
  const buyAmount = formatUnits(order.buy.amount, buyInfo.decimals);

  function handleDelete() {
    if (!onDelete) return;

    setIsLoading(true);
    onDelete();
  }

  return (
    <tr>
      <OrderTd>
        <DefaultFlex gap="0.5rem" align="center">
          <CurrencyOnChainLogo
            tokenInfo={{
              isNative: nativeBuyToken?.name === order.buy.token,
              isToken: nativeBuyToken?.name !== order.buy.token,
              address: order.buy.token,
              chainId: +order.buy.chainId as AtomxChainId,
              symbol: buyInfo.symbol as string,
            }}
          />
          {buyAmount} {buyInfo.symbol}
        </DefaultFlex>
      </OrderTd>
      <OrderTd>
        <DefaultFlex gap="0.5rem" align="center">
          <CurrencyOnChainLogo
            tokenInfo={{
              isNative: nativeSellToken?.name === order.sell.token,
              isToken: nativeSellToken?.name !== order.sell.token,
              address: order.sell.token,
              chainId: +order.sell.chainId as AtomxChainId,
              symbol: sellInfo.symbol as string,
            }}
          />
          {sellAmount} {sellInfo.symbol}
        </DefaultFlex>
      </OrderTd>
      <OrderTd>
        <TelegramLink telegram={order.telegram} />
      </OrderTd>
      <OrderTd>
        {isOwner ? (
          <ButtonSecondary
            width="100%"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </ButtonSecondary>
        ) : (
          <StyledLink
            target="_blank"
            href={`${AtomX}/initiate?sell-amount=${buyAmount}&sell-token=${order.buy.token}&sell-chain-id=${order.buy.chainId}&buy-amount=${sellAmount}&buy-chain-id=${order.sell.chainId}&buy-token=${order.sell.token}&seller-address=${order.owner}`}
          >
            <ButtonSecondary width="100%" disabled={isLoading}>
              BUY {sellInfo.symbol}
            </ButtonSecondary>
          </StyledLink>
        )}
      </OrderTd>
    </tr>
  );
}

export function OrderRowPlaceholder() {
  return (
    <tr>
      <OrderTd>
        <DefaultFlex gap="0.5rem" align="center">
          <LoadingCircle size="45px" />
          <LoadingDiv width="55px" height="25px" />
        </DefaultFlex>
      </OrderTd>
      <OrderTd>
        <DefaultFlex gap="0.5rem" align="center">
          <LoadingCircle size="45px" />
          <LoadingDiv width="65px" height="25px" />
        </DefaultFlex>
      </OrderTd>
      <OrderTd>
        <LoadingDiv width="120px" height="35px" />
      </OrderTd>
    </tr>
  );
}
