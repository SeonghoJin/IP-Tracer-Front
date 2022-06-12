import React from "react";
import styled from "styled-components";
import { ServiceInjector } from "./injector/ServiceInjector";
import { Main } from "./pages/main";

const MainPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <div className="App">
      <ServiceInjector>
        <MainPageLayout>
          <Main />
        </MainPageLayout>
      </ServiceInjector>
    </div>
  );
}

export default App;
