import { atom } from "recoil";
import { HexColor } from "../types/HexColor";
import { useMapOptionStorageService } from "../hooks/useMapOptionStorageService";

type MapBackgroundColorState = HexColor;

export const mapBackgroundColorState = atom<MapBackgroundColorState>({
  key: "mapBackgroundColorState",
  default: "#4a4f5a",
  effects: [
    ({ setSelf, onSet, trigger }) => {
      const storageService = useMapOptionStorageService();

      if (trigger === "get") {
        setSelf(storageService.getBackgroundColor());
      }

      onSet((newValue) => {
        try {
          storageService.setBackgroundColor(newValue);
        } catch (e) {
          console.warn(e);
        }
      });
    },
  ],
});
