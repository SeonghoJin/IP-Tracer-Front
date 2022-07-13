import { atom } from "recoil";
import { RawMessageDto } from "../../types/dtos/rawMessage.dto";

type RawMessageStateType = RawMessageDto | null;

export const rawMessageState = atom<RawMessageStateType>({
  key: "rawMessageState",
  default: null,
});
