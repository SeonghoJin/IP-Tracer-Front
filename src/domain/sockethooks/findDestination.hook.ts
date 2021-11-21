import {atom, useRecoilState} from "recoil";
import {HopDto} from "../dto/hop.dto";

type HopStateType = {
    hop: HopDto;
} | null;

const hopState = atom<HopStateType>({
    key : "destinationState",
    default: null,
});

export const useHop = () => {
    return useRecoilState(hopState);
}