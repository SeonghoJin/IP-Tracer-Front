import { atom } from "recoil";
import { HopDto } from "../types/dtos/hop.dto";

type HopStateType = HopDto | null;

export const hopState = atom<HopStateType>({
  key: "hopState",
  default: null,
});
