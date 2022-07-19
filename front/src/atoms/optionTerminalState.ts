import { atom } from "recoil";
import { useTerminalStorageService } from "../hooks/useTerminalStorageService";

export const optionTerminalPositionState = atom<{ x: number; y: number }>({
  key: "optionTerminalPositionState",
  default: {
    x: 0,
    y: 0,
  },
  effects: [
    ({ setSelf, onSet, trigger }) => {
      const terminalStorageService = useTerminalStorageService();

      if (trigger === "get") {
        setSelf(terminalStorageService.getOptionTerminalPosition());
      }

      onSet((newValue) => {
        try {
          terminalStorageService.setOptionTerminalPosition(newValue);
        } catch (e) {
          console.warn(e);
        }
      });
    },
  ],
});
