import React from "react";
import styled from "styled-components";
import { ServiceProvider } from "./core/ServiceProvider";
import { Main } from "./pages/main";
import style from "./App.module.scss";
import { OptionTerminalProvider } from "./core/OptionTerminalProvider";
import { ColorSettingsProvider } from "./core/ColorSettingProvider";

const MainPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f8fa;
`;

function App() {

  return (
    <div className={style.App}>
      <ServiceProvider>
        <OptionTerminalProvider>
          <ColorSettingsProvider>
            <MainPageLayout>
              <Main />
            </MainPageLayout>
          </ColorSettingsProvider>
        </OptionTerminalProvider>
      </ServiceProvider>
    </div>
  );
}

export default App;
