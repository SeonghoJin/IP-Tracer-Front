import { atom } from "recoil";
import { Hop } from "../types/Hop";

type HopStateType = Hop | null;

export const hopState = atom<HopStateType>({
  key: "hopState",
  default: null,
});
