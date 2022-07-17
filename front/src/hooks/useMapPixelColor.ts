import {useRecoilState} from "recoil";
import { useState} from "react";
import {mapPixelColorState} from "../atoms/mapPixelColorState";
import {isHexColor} from "../types/HexColor";

export const useMapPixelColor = () => {
    const [pixelColor, setPixelColor] = useRecoilState(mapPixelColorState);
    const [isError, setIsError] = useState(false);

    const _setPixelColor = (color: string) => {
        if(isHexColor(color)){
            setPixelColor(color);
            setIsError(false);
            return;
        }
        setIsError(true);
    }

    return {
        pixelColor,
        setPixelColor: _setPixelColor,
        isError
    }
}
