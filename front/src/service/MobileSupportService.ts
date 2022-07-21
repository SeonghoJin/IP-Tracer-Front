import { toBoolean } from "../util/toBoolean";

export interface IMobileSupportService {
    usingAppIfSizeIsMobile: () => boolean;
    yesUsingAppIfSizeIsMobile: () => void;
    noUsingAppIfSizeIsMobile: () => void;
}

export class MobileSupportService implements IMobileSupportService {
    constructor() {}

    private readonly usingAppIfSizeIsMobileKey = "__using_app_if_size_is_mobile__";

    usingAppIfSizeIsMobile(): boolean {
        const flag = window.localStorage.getItem(this.usingAppIfSizeIsMobileKey);
        const pipedFlag = toBoolean(flag);

        return pipedFlag;
    }

    yesUsingAppIfSizeIsMobile(){
        window.localStorage.setItem(this.usingAppIfSizeIsMobileKey, JSON.stringify(true));
    }

    noUsingAppIfSizeIsMobile(){
        window.localStorage.setItem(this.usingAppIfSizeIsMobileKey, JSON.stringify(false));
    }
}
