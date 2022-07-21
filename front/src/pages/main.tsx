import React, {FC, useMemo} from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Content from "../components/Content";
import OptionTerminal from "../components/OptionTerminal";
import UnsafeToastContainer from "../components/UnsafeToastContainer";
import {useApiHealths} from "../hooks/useApiHealths";
import ApiHealthViewList from "../components/ApiHealthViewList";
import {useScreenSize} from "../hooks/useScreenSize";
import MobileAlarm from "../components/MobileAlarm";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FooterLayout = styled.div`
  width: 100%;
  height: 60px;
`;

const ContentLayout = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export const Main: FC = () => {

  const size = useScreenSize();

  const isMobile = useMemo(() => {
      if(size == null){
          return false;
      }

      if(size.width <= 800){
          return true;
      }

      if(size.height <= 800){
          return true;
      }

      return false;
  }, [size])

  return (
    <MainWrapper>
        {isMobile && <MobileAlarm/>}
        <ApiHealthViewList/>
      <UnsafeToastContainer />
      <OptionTerminal />
      <ContentLayout>
        <Content />
      </ContentLayout>
      <FooterLayout>
        <Footer />
      </FooterLayout>
    </MainWrapper>
  );
};
