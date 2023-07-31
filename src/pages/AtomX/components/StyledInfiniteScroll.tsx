import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components/macro";

export const TableInfiteScroll = styled(InfiniteScroll)`
  width: 100%;

  box-sizing: border-box;

  overflow-x: scroll;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    ${({ theme }) =>
      `background-image: linear-gradient(0deg, ${theme.primary1}, transparent);`}

    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    height: 1px;
  }
`;
