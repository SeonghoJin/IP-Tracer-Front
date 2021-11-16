import {FC} from "react";
import styled from "styled-components";

const TextLogoWrapper = styled.div`
  width: 180px;
  height: 88px;
  font-size: 50px;
  color: #4A4F5A;
  font-family: "Noto Sans Old Italic";
  font-style: italic;
`

const IPWrapper = styled.span`
  position: relative;
  bottom: 30px;
  left: 16px;
`

export const TextLogo : FC = () => {
    return (<TextLogoWrapper>
        <IPWrapper>
            IP
        </IPWrapper>
        <span>
            Tracer
        </span>
    </TextLogoWrapper>);
}