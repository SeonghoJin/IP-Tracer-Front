import {useRecoilState} from "recoil";
import {useState} from "react";
import {mapDotTypeState} from "../atoms/mapDotTypeState";
import {isDotType} from "../types/isDotType";

export const useMapDotType = () => {
    const [mapDotType, setMapDotType] = useRecoilState(mapDotTypeState);
    const [isError, setIsError] = useState(false);

    const _setMapDotType = (dotType: string) => {
        if(isDotType(dotType)){
            setMapDotType(dotType);
            setIsError(false);
            return;
        }
        setIsError(true);
    }

    return {
        mapDotType,
        setMapDotType: _setMapDotType,
        isError
    }
}
