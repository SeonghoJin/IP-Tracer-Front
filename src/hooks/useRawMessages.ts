import {useRecoilState} from "recoil";
import {rawMessageStates} from "../states/atoms/rawMessagesState";

export const useRawMessages = () => {

    const [rawMessages, setRawMessages] = useRecoilState(rawMessageStates);

    return {
        rawMessages,
        setRawMessages,
    };
}
