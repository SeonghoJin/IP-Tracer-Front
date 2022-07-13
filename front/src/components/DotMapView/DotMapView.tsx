import * as React from "react";
import { useEffect, useRef } from "react";
import { DotMap } from "@dot-map-renderer/app";
import {Location} from "../../types/Location";
import style from './DotMapView.module.scss';

const dotMap = new DotMap({
    dotType: "circle",
    backgroundColor: "#4A4F5A",
    pixelSize: 2,
    gapSize: 2,
});

type Props = {
    locations: Location[]
}

function DotMapView({locations}: Props){
    const ref = useRef<HTMLDivElement>(null);
    console.log('locations', locations);

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
