import React from "react";
import styled from "styled-components";
import { ServiceProvider } from "./core/ServiceProvider";
import { Main } from "./pages/main";

const MainPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <div className="App">
      <ServiceProvider>
        <MainPageLayout>
          <Main />
        </MainPageLayout>
      </ServiceProvider>
    </div>
  );
}

export default App;
