import {atom, useRecoilState} from "recoil";
import {SocketStatus} from "../core/socket/status";


const routeSocketStatusState= atom<SocketStatus>({
    key : "routeSocketStatusState",
    default: SocketStatus.BeforeStart,
});

export const useSocketStatus = () => {

    const [socketStatus, setSocketStatus] = useRecoilState(routeSocketStatusState);

    return {
      socketStatus,
      setSocketStatus,
    };
}