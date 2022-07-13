import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { isHopDto } from "../types/dtos/hop.dto";
import { hopState } from "../atoms/hopState";

export const useHop = () => {
  const [_hop, _setHop] = useRecoilState(hopState);

  const setHop = useCallback(
    (hop: any) => {
      if (isHopDto(hop)) {
          console.log(hop);
        _setHop(hop);
      } else {
        throw new Error("is not HopDtoType");
      }
    },
    [_setHop]
  );

  return {
    hop: _hop,
    setHop,
  };
};
