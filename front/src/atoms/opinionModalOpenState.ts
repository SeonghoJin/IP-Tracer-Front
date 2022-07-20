import { atom } from "recoil";

export const opinionModalOpenState = atom<boolean>({
  key: "opinionModalOpenState ",
  default: false,
});
