import { atom } from "recoil";
import {DotType} from "@dot-map-renderer/component/src/dot/DotType";

type MapDotTypeState = DotType;

export const mapDotTypeState = atom<MapDotTypeState>({
    key: "mapDotTypeState",
    default: 'circle',
});
