import { TokenInfo } from "@uniswap/token-lists/src/types";
import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useFetchedOrders } from "state/order/hooks";
import styled from "styled-components/macro";
import { Z_INDEX } from "theme";
import { OrdersFilterParams } from "../../../state/order/types";
import Div from "../components/Common/Div";
import { Flex } from "../components/Common/Flex";
import { Confirm } from "../components/Confirm";
import { OrderTable } from "../components/OrderTable";
import { TableInfiteScroll } from "../components/StyledInfiniteScroll";
import { useStyledReactSelectProps } from "../hooks/useStyledReactSelectProps";
import { Status } from "interfaces/statuses";
import { ChainId } from "constants/chains";
// import QuestionHelper from 'components/Common/QuestionHelper';

const OrderListWrapper = styled.main<{ margin?: string; maxWidth?: string }>`
  position: relative;

  max-width: ${({ maxWidth }) => maxWidth ?? "600px"};
  width: 100%;
  background: ${({ theme }) => theme.bg0};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.04),
    0 16px 24px rgba(0, 0, 0, 0.04), 0 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 24px;

  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ margin }) => margin ?? "1rem"};
  margin-bottom: ${({ margin }) => margin ?? "0px"};
  z-index: ${Z_INDEX.deprecated_content};
`;

const Wrappers = styled.div<{
  padding?: string;
  width?: string;
  mobileWidth?: string;
  bg?: string;
}>`
  position: relative;
  width: ${({ width }) => (width ? width : "100%")};
  padding: ${({ padding }) => (padding ? padding : "2rem")};
  ${({ theme, mobileWidth, width }) => theme.mediaWidth.upToSmall`
      width: ${mobileWidth ?? width ?? "auto"};
    `}
`;

const TableWrapper = styled(Wrappers)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

enum AtomXFilter {
  WTB = "WTB",
  WTS = "WTS",
}

const selectOptions = [
  { value: AtomXFilter.WTB, label: AtomXFilter.WTB, icon: null },
  { value: AtomXFilter.WTS, label: AtomXFilter.WTS, icon: null },
];
export enum OrderChainId {
  XDC_PROD = 50,
  POLYGON_PROD = 137,
}
export const TOKEN_LIST_REPO = (chainId: OrderChainId) =>
  `https://raw.githubusercontent.com/pro100skm/atomx-token-list/master/chains/${chainId}/tokenlist.json`;
export function OrderListPage() {
  const { orders, status, fetchNextPage, hasMore } = useFetchedOrders();
  const [filter, setFilter] = useState<OrdersFilterParams>({
    buy: {},
    sell: { chainId: ChainId.XDC_PROD },
  });

  const isLoadingMore = status === Status.PENDING;

  const [value, setValue] = useState(selectOptions[0]);
  const selectStyleProps = useStyledReactSelectProps();
  const { refetchOrders } = useFetchedOrders();
  const [map, setMap] = useState<{
    [chainId: number]: { [tokenAddress: string]: TokenInfo };
  }>({});

  const fetcher = async () => {
    const ALL_CHAINS = [OrderChainId.XDC_PROD, OrderChainId.POLYGON_PROD];
    const resps = await Promise.all(
      ALL_CHAINS.map((chainId) => fetch(TOKEN_LIST_REPO(chainId)))
    );
    const values = await Promise.all(resps.map((va) => va.json()));
    const tokensByChain: {
      [chainId: number]: { [tokenAddress: string]: TokenInfo };
    } = {};
    values.forEach((value) => {
      value.tokens.forEach((token: TokenInfo) => {
        if (!tokensByChain[token.chainId]) {
          tokensByChain[token.chainId] = {};
        }
        tokensByChain[token.chainId][token.address] = token;
      });
    });
    setMap(tokensByChain);
  };

  useEffect(() => {
    fetcher();
  }, []);

  useEffect(() => {
    const filter: OrdersFilterParams = {
      buy: {},
      sell: {},
    };
    filter[value.value !== AtomXFilter.WTB ? "buy" : "sell"] = {
      chainId: ChainId.XDC_PROD,
    };
    setFilter(filter);
    refetchOrders(filter);
  }, [value]);

  return (
    <OrderListWrapper>
      <Confirm />
      <Wrappers>
        <Flex gap="0.5rem" justify="flex-start">
          <Select
            onChange={(
              option: SingleValue<{
                value: AtomXFilter;
                label: AtomXFilter;
                icon: null;
              }>
            ) => {
              if (!option) return;
              setValue(option);
            }}
            options={selectOptions}
            onMenuClose={console.log}
            onMenuOpen={console.log}
            value={value ?? null}
            placeholder="ALL"
            isSearchable={false}
            {...selectStyleProps}
          />
          assets of XDC Network
          {/* <QuestionHelper
            text={
              <Div>
                <Div>WTB - want to buy</Div>
                <Div>WTS - want to sell</Div>
              </Div>
            }
          /> */}
        </Flex>
      </Wrappers>
      <TableWrapper>
        <TableInfiteScroll
          loadMore={() => fetchNextPage(filter)}
          hasMore={hasMore}
          initialLoad={true}
        >
          <OrderTable orders={orders} isLoadingMore={isLoadingMore} map={map} />
        </TableInfiteScroll>
      </TableWrapper>
    </OrderListWrapper>
  );
}
