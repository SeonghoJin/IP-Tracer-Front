import * as React from "react";
import { useEffect, useRef } from "react";
import { DotMap } from "@dot-map-renderer/app";
import {useLocations} from "../../hooks/useLocations";
import style from './DotMapView.module.scss';

const dotMap = new DotMap({
    dotType: "circle",
    backgroundColor: "#4A4F5A",
    pixelSize: 2,
    gapSize: 2,
});

function DotMapView(){
    const ref = useRef<HTMLDivElement>(null);
    const locations = useLocations();
    console.log(locations);

    useEffect(() => {
        if (ref.current != null) {
            dotMap.attaching(ref.current);
        }
    }, []);

    return (
        <div
            ref={ref}
            className={style.DotMapView}
        />
    );
}

export default DotMapView;
