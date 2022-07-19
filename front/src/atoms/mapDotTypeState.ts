import { atom } from "recoil";
import { DotType } from "@dot-map-renderer/component/src/dot/DotType";
import { useMapOptionStorageService } from "../hooks/useMapOptionStorageService";

type MapDotTypeState = DotType;

export const mapDotTypeState = atom<MapDotTypeState>({
  key: "mapDotTypeState",
  default: "circle",
  effects: [
    ({ setSelf, onSet, trigger }) => {
      const storageService = useMapOptionStorageService();

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
