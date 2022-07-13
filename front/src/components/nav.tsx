import { FC } from "react";
import { MainBackgroundColor } from "./css";
import styled from "styled-components";
import { Span, SpanGroup } from "./styled";

const NavigationWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${MainBackgroundColor};
  display: flex;
  justify-content: flex-end;
`;

export const Navigation: FC = () => {
  return (
    <NavigationWrapper>
      <SpanGroup>
        <Span>검색 순위</Span>
      </SpanGroup>
    </NavigationWrapper>
  );
};
