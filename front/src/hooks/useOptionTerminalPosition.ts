import { useRecoilState } from "recoil";
import { optionTerminalPositionState } from "../atoms/optionTerminalState";

export const useOptionTerminalPosition = () => {
  return useRecoilState(optionTerminalPositionState);
};
