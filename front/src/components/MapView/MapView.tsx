import {Suspense} from 'react';
import DotMapView from "../DotMapView";

function MapView(){
    return <Suspense fallback={<div>Loading...</div>}>
        <DotMapView/>
    </Suspense>
}

export default MapView;
