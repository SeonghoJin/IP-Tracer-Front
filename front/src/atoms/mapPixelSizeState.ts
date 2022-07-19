import { atom } from "recoil";
import { useMapOptionStorageService } from "../hooks/useMapOptionStorageService";

type MapPixelSizeState = number;

export const mapPixelSizeState = atom<MapPixelSizeState>({
  key: "mapPixelSizeState",
  default: 4,
  effects: [
    ({ setSelf, onSet, trigger }) => {
      const storageService = useMapOptionStorageService();

      if (trigger === "get") {
        setSelf(storageService.getDotSize());
      }

      onSet((newValue) => {
        try {
          storageService.setDotSize(newValue);
        } catch (e) {
          console.warn(e);
        }
      });
    },
  ],
});
