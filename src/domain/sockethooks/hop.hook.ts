import {atom, useRecoilState} from "recoil";
import {HopDto, isHopDto} from "../dto/hop.dto";
import {useCallback} from "react";

type HopStateType = HopDto | null;

const hopState = atom<HopStateType>({
    key : "hopState",
    default: null,
});

export const useHop = () => {

    const [_hop, _setHop] = useRecoilState(hopState);

    const setHop = useCallback((hop: any) => {
        if(isHopDto(hop)){
            _setHop(hop);
        } else {
            throw new Error("is not HopDtoType");
        }
    }, [_setHop])

    return {
        hop: _hop,
        setHop,
    };
}