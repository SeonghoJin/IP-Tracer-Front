import {FC} from "react";
import {Search} from "./search";
import {TextLogo} from "./textlogo";
import styled from "styled-components";
import {Description} from "./description";

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SearchLayout = styled.div`
    margin-top: 40px;
`

export const ContentGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 30%;
`

export const Content: FC = () => {
    return <ContentWrapper>
        <ContentGroupWrapper>
            <TextLogo/>
            <Description/>
            <SearchLayout>
                <Search/>
            </SearchLayout>
        </ContentGroupWrapper>
    </ContentWrapper>
}