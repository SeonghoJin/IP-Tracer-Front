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
    const controller = useRef<any>(null);

    useEffect(() => {
        dotMap.attach(ref.current!);
        controller.current = dotMap.getController();
        controller.current.addAnchor([35, 127]);

        return () => {
            dotMap.detach();
        }
    }, []);

    useEffect(() => {
        for(let i = 0; i < locations.length - 1; i++){
            const {latitude, longitude}= locations[i];
            const {latitude: latitude2, longitude: longitude2}= locations[i + 1];
            controller.current.addLine([
                [latitude, longitude],
                [latitude2, longitude2]
            ]);
        }
    }, [locations, controller.current]);

    return (
        <div
            ref={ref}
            className={style.DotMapView}
        />
    );
}

export default DotMapView;
