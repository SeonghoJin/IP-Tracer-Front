import {useServices} from "./useServices";

export const useIpLocationService = () => {
    const {ipLocationService} = useServices();
    return ipLocationService;
};
