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

const RemoveButtonLayout = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RemoveButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
`

enum ViewTypes {
    Raw = "Raw",
    Map = "Map",
}

type RouteDataProps = {
    searchingFlag : boolean;
    setSearchingFlag : (flag: boolean) => void;
}

export const RouteData : FC<RouteDataProps> = ({searchingFlag,setSearchingFlag}) =>{
    const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.Map);

    const changeViewType = useCallback((type: ViewTypes) => {
        setViewType(type);
    }, [])

    return <RouteDataView searchingFlag={searchingFlag} changeViewType={changeViewType} viewType={viewType} setSearchingFlag={setSearchingFlag}/>
}

type RouteDataViewProps = {
    searchingFlag: boolean;
    setSearchingFlag : (flag: boolean) => void;
    changeViewType: (type: ViewTypes) => void;
    viewType: ViewTypes
}

export const RouteDataView: FC<RouteDataViewProps> = ({searchingFlag, changeViewType, viewType,setSearchingFlag}) => {
    return <div className={`RouteDataViewWrapper ${searchingFlag && 'active'}`}>
        <header className="header">
            <div className={"button-group"}>
                <Button className={`${ViewTypes.Map === viewType && "active" }`} onClick={() => {changeViewType(ViewTypes.Map)}}>{ViewTypes.Map}</Button>
                <Splitter/>
                <Button className={`${ViewTypes.Raw === viewType && "active" }`} onClick={() => {changeViewType(ViewTypes.Raw)}}>{ViewTypes.Raw}</Button>
                <Splitter/>
            </div>
            <RemoveButtonLayout>
                <RemoveButton onClick={() => {setSearchingFlag(false)}}></RemoveButton>
            </RemoveButtonLayout>
        </header>
        <div id={"main"}>
            {ViewTypes.Map === viewType && <MapDataView/>}
            {ViewTypes.Raw === viewType && <RawDataView/>}
        </div>
    </div>
}