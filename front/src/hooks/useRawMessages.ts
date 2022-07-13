import { useRecoilState } from "recoil";
import { rawMessageStates } from "../atoms/rawMessagesState";

export const useRawMessages = () => {
  const [rawMessages, setRawMessages] = useRecoilState(rawMessageStates);

  return {
    rawMessages,
    setRawMessages,
  };
};
