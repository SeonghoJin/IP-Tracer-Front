import {PIXEL_MAX_SIZE, PIXEL_MIN_SIZE} from "../constants";

export const verifyPixelSize = (dotSize: unknown): dotSize is number => {

    if(typeof dotSize !== 'number'){
        return false;
    }

    if(isNaN(dotSize)){
        return false;
    }

    if(dotSize > PIXEL_MAX_SIZE){
        return false;
    }

    if(dotSize < PIXEL_MIN_SIZE){
        return false;
    }

    return true;
}
