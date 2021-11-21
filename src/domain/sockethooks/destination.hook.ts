import {DestinationDto} from "../dto/destination.dto";
import {atom} from "recoil";

type DestinationStateType = {
    destination: DestinationDto;
} | null

const destinationState = atom<DestinationStateType>({
    key : "destinationState",
    default: null,
})