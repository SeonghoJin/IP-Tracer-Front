import React, { useState } from "react";
import { useAnimationState } from "react-use-animation-state";

export const OptionTerminalContext = React.createContext<
  | ({
      setBlock: (value: boolean) => void;
      block: boolean;
    } & ReturnType<typeof useAnimationState>)
  | null
>(null);

type Props = {
  children: React.ReactNode;
};

export function OptionTerminalProvider({ children }: Props) {
  const { onAnimation, offAnimation, state } = useAnimationState("close", {
    onPreemption: true,
    offPreemption: true,
    offAnimationTime: 500,
    onAnimationTime: 500,
  });

  const [block, setBlock] = useState(false);

  const on = () => {
    if (block) {
      return;
    }
    onAnimation();
  };

  const off = () => {
    if (block) {
      return;
    }
    offAnimation();
  };

  return (
    <OptionTerminalContext.Provider
      value={{
        offAnimation: off,
        onAnimation: on,
        state,
        setBlock,
        block,
      }}
    >
      {children}
    </OptionTerminalContext.Provider>
  );
}
