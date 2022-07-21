import { useEffect, useState } from "react";
import MousePointer from "../MousePointer";
import { sleep } from "../../util/sleep";
import { useVisitService } from "../../hooks/useVisitService";
import { useOptionTerminal } from "../../hooks/useOptionTerminal";
import style from "./OptionTerminalMouseGuide.module.scss";

type Props = {
  terminal: HTMLDivElement;
  mouseState: "open" | "opening" | "closing" | "close";
  closeAnimation: () => void;
  startAnimation: () => void;
};

function OptionTerminalMouseGuide({
  terminal,
  mouseState,
  closeAnimation,
  startAnimation,
}: Props) {
  const [currentPosition, setCurrentPosition] = useState<{
    x: number | string;
    y: number | string;
  }>({
    x: "50vw",
    y: "50vh",
  });
  const visitService = useVisitService();
  const { state: optionState, setBlock } = useOptionTerminal();

  useEffect(() => {
    if (optionState !== "open") {
      return;
    }

    if (visitService.isVisitOptionTerminalMouseGuide()) {
      return;
    }

    startAnimation();
    setBlock(true);
  }, [optionState]);

  useEffect(() => {
    if (mouseState === "open") {
      const { left, right, top } = terminal.getBoundingClientRect();
      const firstX = (left + right) / 2;
      const firstY = top + 30;
      (async () => {
        setCurrentPosition({
          x: "50%",
          y: "50%",
        });
        await sleep(0);
        setCurrentPosition({
          x: firstX,
          y: firstY,
        });
        await sleep(2000);
        setCurrentPosition({
          x: firstX + 150,
          y: firstY,
        });
        await sleep(2000);
        setCurrentPosition({
          x: firstX - 150,
          y: firstY,
        });
        await sleep(2000);
        setCurrentPosition({
          x: firstX,
          y: firstY,
        });
        await sleep(2000);
        closeAnimation();
        setBlock(false);
      })();
    }
  }, [mouseState]);

  return (
    <>
      {mouseState === "open" && (
        <MousePointer
          className={style.OptionTerminalMouseGuide}
          style={{
            left: currentPosition.x,
            top: currentPosition.y,
          }}
        />
      )}
    </>
  );
}

export default OptionTerminalMouseGuide;
