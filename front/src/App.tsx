import React from "react";
import styled from "styled-components";
import { ServiceProvider } from "./core/ServiceProvider";
import { Main } from "./pages/main";
import SideBar from "./components/SideBar";
import style from './App.module.scss';

const MainPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {


  return (
    <div className={style.App}>
        <button></button>
      <ServiceProvider>
        <SideBar isOpen={true}/>
        <MainPageLayout>
          <Main />
        </MainPageLayout>
      </ServiceProvider>
    </div>
  );
}

export default App;
