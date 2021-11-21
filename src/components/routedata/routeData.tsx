import {FC, useCallback, useState} from "react";
import "./routeData.css";
import styled from "styled-components";
import {MapDataView} from "./mapDataView";
import {RawDataView} from "./rawDataView";

const Splitter = styled.div`
  height: 100%;
  border-right: 1px solid #d3d3d3;
`

const Button = styled.button`
  width: 70px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  color: #4A4F5A;
`

enum ViewTypes {
    Raw = "Raw",
    Map = "Map",
}

type RouteDataProps = {
    searchingFlag : boolean;
}

export const RouteData : FC<RouteDataProps> = ({searchingFlag}) =>{
    const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.Map);

    const changeViewType = useCallback((type: ViewTypes) => {
        setViewType(type);
    }, [])

    return <RouteDataView searchingFlag={searchingFlag} changeViewType={changeViewType} viewType={viewType}/>
}

type RouteDataViewProps = {
    searchingFlag: boolean;
    changeViewType: (type: ViewTypes) => void;
    viewType: ViewTypes
}

export const RouteDataView: FC<RouteDataViewProps> = ({searchingFlag, changeViewType, viewType}) => {
    return <div className={`RouteDataViewWrapper ${searchingFlag && 'active'}`}>
        <header className="header">
            <Button className={`${ViewTypes.Map === viewType && "active" }`} onClick={() => {changeViewType(ViewTypes.Map)}}>{ViewTypes.Map}</Button>
            <Splitter/>
            <Button className={`${ViewTypes.Raw === viewType && "active" }`} onClick={() => {changeViewType(ViewTypes.Raw)}}>{ViewTypes.Raw}</Button>
            <Splitter/>
        </header>
        <div id={"main"}>
            {ViewTypes.Map === viewType && <MapDataView/>}
            {ViewTypes.Raw === viewType && <RawDataView/>}
        </div>
    </div>
}