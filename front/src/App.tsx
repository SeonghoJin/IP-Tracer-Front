import React from "react";
import styled from "styled-components";
import { ServiceProvider } from "./core/ServiceProvider";
import { Main } from "./pages/main";
import style from './App.module.scss';

const MainPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F5F8FA;
`;

function App() {
  return (
    <div className={style.App}>
      <ServiceProvider>
        <MainPageLayout>
          <Main />
        </MainPageLayout>
      </ServiceProvider>
    </div>
  );
}

export default App;
