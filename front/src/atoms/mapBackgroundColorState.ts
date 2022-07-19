import { atom } from "recoil";
import {HexColor} from "../types/HexColor";
import {useStorageService} from "../hooks/useStorageService";

type MapBackgroundColorState = HexColor;

export const mapBackgroundColorState = atom<MapBackgroundColorState>({
    key: "mapBackgroundColorState",
    default: '#4a4f5a',
    effects: [({setSelf, onSet, trigger}) => {
        const storageService = useStorageService();

        if(trigger === 'get'){
            setSelf(storageService.getBackgroundColor());
        }

        onSet(newValue => {
            try {
                storageService.setBackgroundColor(newValue);
            } catch (e){
                console.warn(e);
            }
        });
    }]
});
