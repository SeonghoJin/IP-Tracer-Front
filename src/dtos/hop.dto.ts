export interface HopDto {
    hop: number,
    ip: {
        address: string
    },
    time: string,
}

export const isHopDto = (hopDto : any) : hopDto is HopDto => {
    if(!('hop' in hopDto))return false;
    if(!('ip' in hopDto))return false;
    if(!('time' in hopDto))return false;
    return true;
}