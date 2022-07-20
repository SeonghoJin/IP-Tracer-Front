import {useRecoilState} from "recoil";
import {apiHealthState} from "../atoms/apiHealthState";

export const useApiHealths = () => {
    return useRecoilState(apiHealthState);
}
