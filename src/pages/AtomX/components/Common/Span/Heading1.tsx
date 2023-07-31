import styled from "styled-components/macro";

import { Span, SpanProps } from ".";

const Heading1Wrapper = styled.h1<{ margin?: string }>`
  margin: ${({ margin }) => margin};
`;

export function Heading1(props: SpanProps) {
  return (
    <Heading1Wrapper margin={props.margin}>
      <Span themeColor="text1" fontSize="32px" fontWeight="700" {...props} />
    </Heading1Wrapper>
  );
}
