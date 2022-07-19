import { atom } from "recoil";
import { useStorageService } from "../hooks/useStorageService";

type MapGapSizeState = number;

export const mapGapSizeState = atom<MapGapSizeState>({
  key: "mapGapSizeState",
  default: 2,
  effects: [
    ({ setSelf, onSet, trigger }) => {
      const storageService = useStorageService();

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
