import { useRecoilState } from "recoil";
import { useState } from "react";
import { DotType } from "@dot-map-renderer/component/src/dot/DotType";
import { mapDotTypeState } from "../atoms/mapDotTypeState";
import { isDotType } from "../types/isDotType";

export const useMapDotType = () => {
  const [mapDotType, setMapDotType] = useRecoilState(mapDotTypeState);
  const [isError, setIsError] = useState(false);

  const _setMapDotType = (dotType: DotType) => {
    if (isDotType(dotType)) {
      setMapDotType(dotType);
      setIsError(false);
      return;
    }
    setIsError(true);
  };

  return {
    mapDotType,
    setMapDotType: _setMapDotType,
    isError,
  };
};
