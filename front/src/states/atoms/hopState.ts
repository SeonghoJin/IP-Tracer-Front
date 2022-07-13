import { atom } from "recoil";
import { HopDto } from "../../dtos/hop.dto";

type HopStateType = HopDto | null;

export const hopState = atom<HopStateType>({
  key: "hopState",
  default: null,
});
