import { atom } from "recoil";

export const optionTerminal = atom<boolean>({
  key: "optionTerminalState",
  default: false,
});
