import {useRecoilState} from "recoil";
import {opinionModalOpenState} from "../atoms/opinionModalOpenState";

export const useOpinionModal = () => {
    return useRecoilState(opinionModalOpenState);
}
