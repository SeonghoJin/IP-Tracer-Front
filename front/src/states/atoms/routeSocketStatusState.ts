import { atom } from "recoil";
import { SocketStatus } from "../../constants/status";

export const routeSocketStatusState = atom<SocketStatus>({
  key: "routeSocketStatusState",
  default: SocketStatus.BeforeStart,
});
