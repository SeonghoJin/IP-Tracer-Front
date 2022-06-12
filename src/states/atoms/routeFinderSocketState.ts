import {atom} from "recoil";

export const routeFinderSocketState = atom<WebSocket | null>({
    key : "socket",
    default: null,
});
