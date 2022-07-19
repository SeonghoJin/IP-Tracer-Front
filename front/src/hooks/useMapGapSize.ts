import { useRecoilState } from "recoil";
import { useState } from "react";
import { mapGapSizeState } from "../atoms/mapGapSizeState";
import { PIXEL_MAX_GAP_SIZE, PIXEL_MIN_GAP_SIZE } from "../constants";

export const useMapGapSize = () => {
  const [mapGapSize, setMapGapSize] = useRecoilState(mapGapSizeState);
  const [isError, setIsError] = useState(false);

  const _setMapGapSize = (gapSize: number) => {
    if (Number.isNaN(gapSize)) {
      setIsError(true);
      return;
    }

    if (gapSize < PIXEL_MIN_GAP_SIZE) {
      setIsError(true);
      return;
    }

    if (gapSize > PIXEL_MAX_GAP_SIZE) {
      setIsError(true);
      return;
    }

    setMapGapSize(gapSize);
    setIsError(false);
  };

  return {
    mapGapSize,
    setMapGapSize: _setMapGapSize,
    isError,
  };
};
