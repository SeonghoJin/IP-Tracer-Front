import { useCallback, useState } from "react";
import styled from "styled-components";
import { SocketStatus } from "../../constants/status";
import { useSocketStatus } from "../../hooks/useRouteSocketStatus";
import TerminalView from "../TerminalView";
import DotMapView from "../DotMapView";
import {useLocations} from "../../hooks/useLocations";
import {useDomainSearch} from "../../hooks/useDomainSearch";
import './RouteView.css';
import OptionButton from "../OptionButton";

const Splitter = styled.div`
  height: 100%;
  border-right: 1px solid #d3d3d3;
`;

const Button = styled.button`
  width: 90px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  color: #4a4f5a;
`;

const ContentLayout = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
`;

const Status = styled.div<{ status: SocketStatus }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => {
    if (props.status === SocketStatus.Start) {
      return "blue";
    }
    return "#90ee90";
  }};
  border-radius: 50%;
`;

const enum ViewTypes {
    Terminal = "Terminal",
    Map = "Map",
}

function RouteView(){
    const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.Map);
    const [searchState, setSearchState] = useDomainSearch();
    const { socketStatus } = useSocketStatus();
    const {locations}= useLocations();

    const changeViewType = useCallback((type: ViewTypes) => {
        setViewType(type);
    }, []);

    return (
        <div className={`RouteDataViewWrapper ${searchState.searching && "active"}`}>
            <header className="header">
                <div className={"group"}>
                    <Button
                        className={`${ViewTypes.Map === viewType && "active"}`}
                        onClick={() => {
                            changeViewType(ViewTypes.Map);
                        }}
                    >
                        {ViewTypes.Map}
                    </Button>
                    <Splitter />
                    <Button
                        className={`${ViewTypes.Terminal === viewType && "active"}`}
                        onClick={() => {
                            changeViewType(ViewTypes.Terminal);
                        }}
                    >
                        {ViewTypes.Terminal}
                    </Button>
                    <Splitter />
                </div>
                <div className={"group"}>
                    <ContentLayout>
                        <OptionButton/>
                    </ContentLayout>
                    <ContentLayout>
                        <Status status={socketStatus}></Status>
                    </ContentLayout>
                    <ContentLayout>
                        <RemoveButton
                            onClick={() => {
                                setSearchState((searchState) => ({
                                    ...searchState,
                                    searching: false
                                }));
                            }}
                        />
                    </ContentLayout>
                </div>
            </header>
            <div id={"main"}>
                {ViewTypes.Map === viewType && <DotMapView locations={locations}/>}
                {ViewTypes.Terminal === viewType && <TerminalView />}
            </div>
        </div>
    );
}

export default RouteView;
