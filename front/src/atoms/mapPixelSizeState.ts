import { atom } from "recoil";

type MapPixelSizeState = number;

export const mapPixelSizeState = atom<MapPixelSizeState>({
    key: "mapPixelSizeState",
    default: 4,
});
