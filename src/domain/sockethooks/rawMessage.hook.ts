import {atom, useRecoilState} from "recoil";
import {isRawMessage, RawMessageDto} from "../dto/rawMessage.dto";
import {useCallback} from "react";
import {useRawMessages} from "../../hooks/rawMessages.hooks";

type RawMessageStateType = RawMessageDto | null;

const rawMessageState = atom<RawMessageStateType>({
    key : "rawMessageState",
    default: null,
});

export const useRawMessage = () => {

    const [_rawMessage, _setRawMessage] = useRecoilState(rawMessageState);
    const {setRawMessages} = useRawMessages();
    const setRawMessage = useCallback((rawMessage: any) => {
        if(isRawMessage(rawMessage)){
            _setRawMessage(rawMessage);
            setRawMessages((prev) => prev.concat(rawMessage));
        } else {
            throw new Error("is not RawMessageType");
        }
    }, [_setRawMessage])

    return {
        rawMessage: _rawMessage,
        setRawMessage,
    };

}