import {FC} from "react";
import styled from "styled-components";

const SearchWrapper = styled.div`
  width: 560px;
  height: 45px;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 2px solid rgba(74, 79, 90, 0.8);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
`

export const Search: FC = () => {
    return (<SearchWrapper>
        <Input type={"text"} placeholder={"궁금한 도메인을 입력하세요. ex. naver.com"}/>
    </SearchWrapper>)
}