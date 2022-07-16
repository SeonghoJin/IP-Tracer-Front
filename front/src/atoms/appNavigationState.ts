import { atom } from "recoil";

export const appNavigationState = atom<boolean>({
    key: "appNavigationState ",
    default: false
});
