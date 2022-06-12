import { useRecoilState} from "recoil";
import {routeSocketStatusState} from "../states/atoms/routeSocketStatusState";

export const useSocketStatus = () => {

    const [socketStatus, setSocketStatus] = useRecoilState(routeSocketStatusState);

    return {
      socketStatus,
      setSocketStatus,
    };
}
