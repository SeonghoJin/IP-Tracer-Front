import { atom } from "recoil";
import { DotType } from "@dot-map-renderer/component/src/dot/DotType";
import { useStorageService } from "../hooks/useStorageService";

type MapDotTypeState = DotType;

export const mapDotTypeState = atom<MapDotTypeState>({
  key: "mapDotTypeState",
  default: "circle",
  effects: [
    ({ setSelf, onSet, trigger }) => {
      const storageService = useStorageService();

      if (trigger === "get") {
        setSelf(storageService.getDotType());
      }

      onSet((newValue) => {
        try {
          storageService.setDotType(newValue);
        } catch (e) {
          console.warn(e);
        }
      });
    },
  ],
});
