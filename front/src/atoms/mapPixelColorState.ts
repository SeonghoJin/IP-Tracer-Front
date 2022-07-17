import { atom } from "recoil";
import {HexColor} from "../types/HexColor";

type MapPixelColorState = HexColor;

export const mapPixelColorState = atom<MapPixelColorState>({
    key: "mapPixelColorState",
    default: '#FFFFFF',
});
