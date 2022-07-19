import {useRecoilState} from "recoil";
import {toastWaitState} from "../atoms/toastWaitState";

export const useToastWaitState = () => {
    return useRecoilState(toastWaitState);
}
