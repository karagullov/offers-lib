import styled, { css } from "styled-components";

export const OrderTableWrapper = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
`;

const horPad = "0.5rem";
const columnStyles = css`
  padding: 0.5rem ${horPad} 0.5rem 0;
  text-align: left;
  :first-child {
    padding-left: 0;
  }
  :last-child {
    width: max-content;
    white-space: nowrap;
    padding-right: 0;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 0.15rem;
  `}
`;

export const OrderTh = styled.th`
  ${columnStyles};
  padding-bottom: 1rem;
  white-space: nowrap;
`;
export const OrderTd = styled.td`
  ${columnStyles};
`;
