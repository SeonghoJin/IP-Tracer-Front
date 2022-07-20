import { atom } from "recoil";
import {ApiHealth} from "../types/ApiHealth";
import {useIpLocationService} from "../hooks/useIpLocationService";

export const apiHealthState = atom<ApiHealth[]>({
    key: "apiHealthState",
    default: [],
    effects: [({setSelf, trigger}) => {
        const loadAPIHealths = async () => {
         const ipLocationService = useIpLocationService();
         const apiHealths = await ipLocationService.getApiHealths();
         if(apiHealths) {
             setSelf(apiHealths);
         }
        }

        if(trigger === 'get'){
            loadAPIHealths();
        }
    }],
});
