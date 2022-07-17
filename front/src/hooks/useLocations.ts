import {useEffect, useRef, useState} from "react";
import { Hop } from "../types/Hop";
import {Location} from "../types/Location";
import {useIpLocationService} from "./useIpLocationService";
import {useHop} from "./useHop";

export const useLocations = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const queue = useRef<Hop[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const {hop} = useHop();
    const ipLocationService = useIpLocationService();

    useEffect(() => {
        if(!hop){
            return;
        }

        queue.current.push(hop);
    }, [hop]);

    useEffect(() => {

        if(queue.current.length === 0){
            return;
        }

        if(fetching){
            return;
        }

        setFetching(true);

        const currentHop = queue.current.shift();

        if(!currentHop){
            setFetching(false);
            return;
        }

        const {ip: {address}} = currentHop;

        (async () => {
            const location = await ipLocationService.findLocation(address);

            if(location) {
                setLocations((locations) => {
                    return locations.concat(location)
                })
            }

            setFetching(false);
        })();
    }, [fetching, queue.current.length]);

    return {
        locations,
        clearLocations(){
            setLocations([]);
        }
    };
}
