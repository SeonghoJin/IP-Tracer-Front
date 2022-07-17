export type HexColor = `#${string}`;

export const isHexColor = (color: any) : color is HexColor => {
    if(color === undefined){
        return false;
    }

    if(typeof color !== 'string'){
        return false;
    }

    if('#' !== color[0]){
        return false;
    }

    return true;
}
