import { atom } from "recoil";
import { DestinationDto } from "../types/dtos/destination.dto";

type DestinationStateType = {
  destination: DestinationDto;
} | null;

export const destinationState = atom<DestinationStateType>({
  key: "destinationState",
  default: null,
});
