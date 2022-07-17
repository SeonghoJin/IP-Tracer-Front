import { atom } from "recoil";

type MapGapSizeState = number;

export const mapGapSizeState = atom<MapGapSizeState>({
    key: "mapGapSizeState",
    default: 2,
});
