import {FC} from "react";
import "./routeData.css";

type RouteDataProps = {
    searchingFlag : boolean;
}

export const RouteData : FC<RouteDataProps> = ({searchingFlag}) =>{
    return <RouteDataView searchingFlag={searchingFlag}/>
}

type RouteDataViewProps = {
    searchingFlag: boolean;
}

export const RouteDataView: FC<RouteDataViewProps> = ({searchingFlag}) => {
    return <div className={`RouteDataViewWrapper ${searchingFlag && 'active'}`}></div>
}