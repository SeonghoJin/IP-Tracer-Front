import {useEffect, useState} from "react";
import {isLocation, Location} from "../types/interfaces";
import {useLocationJobId} from "./useLocationJobId";
import {useIpLocationService} from "./useIpLocationService";

export const useLocations = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const jobId = useLocationJobId();
    console.log(jobId);
    const {getLocationResource} = useIpLocationService();

    useEffect(() => {
        if(jobId){
            getLocationResource(jobId).then((location) => {
                if(isLocation(location)){
                    setLocations((locations) => {
                        return locations.concat(location)
                    })
                }
            })
        }
    }, [jobId]);

    return locations;
}
