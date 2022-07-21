import { useCallback, useContext } from "react";
import { OptionTerminalContext } from "../core/OptionTerminalProvider";

export const useOptionTerminal = () => {
  const context = useContext(OptionTerminalContext);

  if (context === null) {
    throw new Error("not defined optionTerminal Context");
  }

  const { state, offAnimation, onAnimation, block, setBlock } = context;

  const toggle = useCallback(() => {
    if (state === "open" || state === "opening") {
      offAnimation();
      return;
    }

    onAnimation();
  }, [onAnimation, offAnimation, block]);

  const off = useCallback(() => {
    offAnimation();
  }, [offAnimation, block]);

  const on = useCallback(() => {
    onAnimation();
  }, [onAnimation, block]);

  return {
    toggle,
    on,
    off,
    state,
    block,
    setBlock
  };
};
