import {atom} from "recoil";

export const rawMessageStates = atom<Array<string>>({
    key : "rawMessageStates",
    default: [],
});
