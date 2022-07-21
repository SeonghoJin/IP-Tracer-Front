import {useServices} from "./useServices";

export const useMobileSupportService = () => {
    const {mobileSupportService} = useServices();

    return mobileSupportService;
}
