import * as React from 'react';
import { DotMap } from "dot-map-renderer";
import { useEffect, useRef } from "react";

const dotMap = new DotMap({
    dotType: 'rectangular',
    backgroundColor: '#4A4F5A',
    pixelSize: 2,
    gapSize: 2,
});

export const DotMapViewer = () => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(ref.current != null) {
            dotMap.attaching(ref.current);
        }
    }, [])

    return (
        <div ref={ref} style={{
            overflow: 'auto',
            backgroundColor: '#4A4F5A',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}/>
    );
};

