import { atom } from "recoil";
import { HexColor } from "../types/HexColor";
import { useStorageService } from "../hooks/useStorageService";

type MapPixelColorState = HexColor;

export const mapPixelColorState = atom<MapPixelColorState>({
  key: "mapPixelColorState",
  default: "#FFFFFF",
  effects: [
    ({ setSelf, onSet, trigger }) => {
      const storageService = useStorageService();

      if (trigger === "get") {
        setSelf(storageService.getDotColor());
      }

      onSet((newValue) => {
        try {
          storageService.setDotColor(newValue);
        } catch (e) {
          console.warn(e);
        }
      });
    },
  ],
});
