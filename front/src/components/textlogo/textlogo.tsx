import { FC } from "react";
import styled from "styled-components";
import "./textlogo.css";

const TextLogoWrapper = styled.div`
  width: 180px;
  height: 88px;
  font-size: 50px;
  color: #4a4f5a;
  font-family: "Noto Sans Old Italic";
  font-style: italic;
`;

type TextLogoProps = {
  searchingFlag: boolean;
};

export const TextLogo: FC<TextLogoProps> = ({ searchingFlag }) => {
  return (
    <TextLogoWrapper className={`TextLogo ${searchingFlag && "active"}`}>
      <span className={`ip-wrapper ${searchingFlag && "active"}`}>IP</span>
      <span>Tracer</span>
    </TextLogoWrapper>
  );
};
