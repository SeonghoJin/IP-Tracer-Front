import { FC, useCallback, useState } from "react";
import "./routeData.css";
import styled from "styled-components";
import { SocketStatus } from "../../constants/status";
import { useSocketStatus } from "../../hooks/useRouteSocketStatus";
import { MapDataView } from "./mapDataView";
import { RawDataView } from "./rawDataView";

const Splitter = styled.div`
  height: 100%;
  border-right: 1px solid #d3d3d3;
`;

const Button = styled.button`
  width: 70px;
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

enum ViewTypes {
  Raw = "Raw",
  Map = "Map",
}

type RouteDataProps = {
  searchingFlag: boolean;
  setSearchingFlag: (flag: boolean) => void;
};

export const RouteData: FC<RouteDataProps> = ({
  searchingFlag,
  setSearchingFlag,
}) => {
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.Map);
  const { socketStatus } = useSocketStatus();

  const changeViewType = useCallback((type: ViewTypes) => {
    setViewType(type);
  }, []);

  return (
    <RouteDataView
      socketStatus={socketStatus}
      searchingFlag={searchingFlag}
      changeViewType={changeViewType}
      viewType={viewType}
      setSearchingFlag={setSearchingFlag}
    />
  );
};

type RouteDataViewProps = {
  searchingFlag: boolean;
  setSearchingFlag: (flag: boolean) => void;
  changeViewType: (type: ViewTypes) => void;
  viewType: ViewTypes;
  socketStatus: SocketStatus;
};

export const RouteDataView: FC<RouteDataViewProps> = ({
  searchingFlag,
  changeViewType,
  viewType,
  setSearchingFlag,
  socketStatus,
}) => {
  return (
    <div className={`RouteDataViewWrapper ${searchingFlag && "active"}`}>
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
            className={`${ViewTypes.Raw === viewType && "active"}`}
            onClick={() => {
              changeViewType(ViewTypes.Raw);
            }}
          >
            {ViewTypes.Raw}
          </Button>
          <Splitter />
        </div>
        <div className={"group"}>
          <ContentLayout>
            <Status status={socketStatus}></Status>
          </ContentLayout>
          <ContentLayout>
            <RemoveButton
              onClick={() => {
                setSearchingFlag(false);
              }}
            ></RemoveButton>
          </ContentLayout>
        </div>
      </header>
      <div id={"main"}>
        {ViewTypes.Map === viewType && <MapDataView />}
        {ViewTypes.Raw === viewType && <RawDataView />}
      </div>
    </div>
  );
};
