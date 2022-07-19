import { useRecoilState } from "recoil";
import { useState } from "react";
import { mapBackgroundColorState } from "../atoms/mapBackgroundColorState";
import { isHexColor } from "../types/HexColor";

export const useMapBackgroundColor = () => {
  const [backgroundColor, setBackgroundColor] = useRecoilState(
    mapBackgroundColorState
  );
  const [isError, setIsError] = useState(false);

  const _setBackgroundColor = (color: string) => {
    if (isHexColor(color)) {
      setBackgroundColor(color);
      setIsError(false);
      return;
    }
    setIsError(true);
  };

  return {
    backgroundColor,
    setBackgroundColor: _setBackgroundColor,
    isError,
  };
};
