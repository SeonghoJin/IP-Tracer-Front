import { useRecoilState } from "recoil";
import { routeSocketStatusState } from "../atoms/routeSocketStatusState";

export const useSocketStatus = () => {
  const [socketStatus, setSocketStatus] = useRecoilState(
    routeSocketStatusState
  );

  return {
    socketStatus,
    setSocketStatus,
  };
};
