import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { isRawMessage } from "../types/dtos/rawMessage.dto";
import { rawMessageState } from "../states/atoms/rawMessageState";
import { useRawMessages } from "./useRawMessages";

export const useRawMessage = () => {
  const [_rawMessage, _setRawMessage] = useRecoilState(rawMessageState);
  const { setRawMessages } = useRawMessages();
  const setRawMessage = useCallback(
    (rawMessage: any) => {
      if (isRawMessage(rawMessage)) {
        _setRawMessage(rawMessage);
        setRawMessages((prev) => prev.concat(rawMessage));
      } else {
        throw new Error("is not RawMessageType");
      }
    },
    [_setRawMessage]
  );

  return {
    rawMessage: _rawMessage,
    setRawMessage,
  };
};
