import {DotType} from "@dot-map-renderer/component/src/dot/DotType";

export const isDotType = (obj: any): obj is DotType => {
    if(typeof obj !== 'string'){
        return false;
    }

    if(obj === 'rectangular' || obj === 'circle'){
        return true;
    }

    return false;
}
