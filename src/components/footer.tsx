import {FC} from "react";
import styled from "styled-components";
import {MainBackgroundColor} from "./css";
import {SpanGroup, Span} from "./styled";

const FooterWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${MainBackgroundColor};
  display: flex;
  justify-content: space-between;
`

export const Footer: FC = () => {
    return (<FooterWrapper>
        <SpanGroup>
            <Span>
                IP Tracer의 원리
            </Span>
            <Span>
                의견 보내기
            </Span>
        </SpanGroup>
        <SpanGroup>
            <Span>
                Github
            </Span>
            <Span>
                Email
            </Span>
        </SpanGroup>
    </FooterWrapper>)
}