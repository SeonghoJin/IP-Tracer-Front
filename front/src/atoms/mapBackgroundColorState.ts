import { atom } from "recoil";
import {HexColor} from "../types/HexColor";

type MapBackgroundColorState = HexColor;

export const mapBackgroundColorState = atom<MapBackgroundColorState>({
    key: "mapBackgroundColorState ",
    default: '#4a4f5a',
});
