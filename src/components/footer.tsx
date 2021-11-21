import {FC} from "react";
import styled from "styled-components";
import {MainBackgroundColor} from "./css";
import {SpanGroup, Span} from "./styled";
import GithubIcon from '../static/images/GitHub-Mark-Light-32px.png'

const FooterWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${MainBackgroundColor};
  display: flex;
  justify-content: space-between;
`

export const Footer: FC = () => {

    return <FooterView></FooterView>
}

export const FooterView: FC = () => {
    return (<FooterWrapper>
        <SpanGroup>
            <Span>
                의견 보내기
            </Span>
        </SpanGroup>
        <SpanGroup>
            <a href={"https://github.com/SeonghoJin"} target={"_blank"}>
                <img src={GithubIcon}/>
            </a>
        </SpanGroup>
    </FooterWrapper>)
}