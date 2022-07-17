import {useRecoilState} from "recoil";
import { useState} from "react";
import { PIXEL_MAX_SIZE, PIXEL_MIN_SIZE} from "../constants";
import {mapPixelSizeState} from "../atoms/mapPixelSizeState";

export const useMapPixelSize = () => {
    const [mapPixelSize, setMapPixelSize] = useRecoilState(mapPixelSizeState);
    const [isError, setIsError] = useState(false);

    const _setMapPixelSize = (pixelSize: number) => {
        if(mapPixelSize < PIXEL_MIN_SIZE){
            setIsError(true);
            return;
        }

        if(mapPixelSize > PIXEL_MAX_SIZE){
            setIsError(true);
            return;
        }

        setMapPixelSize(pixelSize);
        setIsError(false);
    }

    return {
        mapPixelSize,
        setMapPixelSize: _setMapPixelSize,
        isError
    }
}
