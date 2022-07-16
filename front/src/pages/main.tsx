import { FC } from "react";
import styled from "styled-components";
import Footer  from "../components/Footer";
import Content from "../components/Content";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F6F8FA;
`;

const FooterLayout = styled.div`
  width: 100%;
  height: 60px;
`;

const ContentLayout = styled.div`
  width: 100%;
  flex: 1;
`;

export const Main: FC = () => {
  return (
    <MainWrapper>
      <ContentLayout>
        <Content />
      </ContentLayout>
      <FooterLayout>
        <Footer />
      </FooterLayout>
    </MainWrapper>
  );
};
