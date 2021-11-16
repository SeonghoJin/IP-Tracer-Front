import React from 'react';
import styled from "styled-components";
import {Main} from "./pages/main";

const MainPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
`

function App() {
  return (
    <div className="App">
        <MainPageLayout>
            <Main/>
        </MainPageLayout>
    </div>
  );
}

export default App;
