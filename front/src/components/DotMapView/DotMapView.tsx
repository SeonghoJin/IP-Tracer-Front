import * as React from "react";
import { useMemo} from "react";
import { ReactDotMap } from "@dot-map-renderer/react";
import {DotMapOptionArg} from "@dot-map-renderer/app/src/dotMapOptionArg";
import {LineData} from "@dot-map-renderer/component/src/line/LineData";
import {Point} from "@dot-map-renderer/component/src/Point";
import {Location} from "../../types/Location";
import style from './DotMapView.module.scss';

const options : DotMapOptionArg = {
    dotType: "circle",
    backgroundColor: "#4A4F5A",
    pixelSize: 2,
    gapSize: 2,
}

type Props = {
    locations: Location[]
}

function DotMapView({locations}: Props){

    const anchors = useMemo(() => {
        return locations.map(({latitude, longitude}) => ([latitude, longitude]) as Point) ;
    },[locations])

    const lines = useMemo(() => {

        const lines = [];

        for(let i = 0; i < locations.length - 1; i++){
            const { latitude, longitude } = locations[i];
            const { latitude: latitude2, longitude: longitude2 } = locations[i + 1];

            lines.push([
                [latitude, longitude],
                [latitude2, longitude2]
            ] as LineData);
        }

        return lines;
    }, [locations]);

    return (<ReactDotMap
        anchors={anchors}
        lines={lines}
        options={options}
        className={style.DotMapView}
    />);
}

export default DotMapView;
