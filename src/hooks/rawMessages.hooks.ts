import {atom, useRecoilState} from "recoil";
import {useCallback} from "react";
import {isRawMessage} from "../domain/dto/rawMessage.dto";

const rawMessageStates = atom<Array<string>>({
    key : "rawMessageStates",
    default: [],
});

export const useRawMessages = () => {

    const [rawMessages, setRawMessages] = useRecoilState(rawMessageStates);

    return {
        rawMessages,
        setRawMessages,
    };
}
