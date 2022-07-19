import { atom } from "recoil";
import { useMapOptionStorageService } from "../hooks/useMapOptionStorageService";

type MapGapSizeState = number;

export const mapGapSizeState = atom<MapGapSizeState>({
  key: "mapGapSizeState",
  default: 2,
  effects: [
    ({ setSelf, onSet, trigger }) => {
      const storageService = useMapOptionStorageService();

      if (trigger === "get") {
        setSelf(storageService.getGapSize());
      }

      onSet((newValue) => {
        try {
          storageService.setGapSize(newValue);
        } catch (e) {
          console.warn(e);
        }
      });
    },
  ],
});
