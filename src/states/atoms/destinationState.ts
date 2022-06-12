import {DestinationDto} from "../../dtos/destination.dto";
import {atom} from "recoil";

type DestinationStateType = {
    destination: DestinationDto;
} | null

export const destinationState = atom<DestinationStateType>({
    key : "destinationState",
    default: null,
})
