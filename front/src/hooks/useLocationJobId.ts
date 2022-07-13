import {useEffect, useState} from "react";
import {useHop} from "./useHop";
import {useIpLocationService} from "./useIpLocationService";

export const useLocationJobId = () => {
    const { hop } = useHop();
    const [jobId, setJobId] = useState<number | null>(null);
    const {findLocation} = useIpLocationService();

    useEffect(() => {
        if(hop){
            findLocation(hop.ip.address).then((jobId) => {
                setJobId(jobId)
            })
        }
    }, [hop])

    return jobId;
}
