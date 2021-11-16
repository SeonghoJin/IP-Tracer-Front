import {FC} from "react";
import styled from "styled-components";
import {MainBackgroundColor} from "../components/css";
import {Footer} from "../components/footer";
import {Navigation} from "../components/nav";
import {Search} from "../components/search";
import {TextLogo} from "../components/textlogo";
import {Content} from "../components/content";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const NavLayout = styled.div`
  width: 100%;
  height: 60px;
`

const FooterLayout = styled.div`
  width: 100%;
  height: 60px;
`

const ContentLayout = styled.div`
  width: 100%;
  flex: 1
`

export const Main : FC = () => {
    return (<MainWrapper>
        <NavLayout>
            <Navigation/>
        </NavLayout>
        <ContentLayout>
            <Content/>
        </ContentLayout>
        <FooterLayout>
            <Footer/>
        </FooterLayout>
    </MainWrapper>)
}