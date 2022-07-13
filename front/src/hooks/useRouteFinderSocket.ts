import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { routeFinderSocketState } from "../states/atoms/routeFinderSocketState";
import { RouteSocketReceiveEvent, RouteSocketSendEvent } from "../constants";
import { SocketStatus } from "../constants/status";
import { isMessage, Message } from "../types/interfaces";
import { config } from "../config";
import { useSocketStatus } from "./useRouteSocketStatus";
import { useHop } from "./useHop";
import { useRawMessage } from "./useRawMessage";

export const useRouteFinderSocket = () => {
  const [socket, setSocket] = useRecoilState(routeFinderSocketState);
  const { setSocketStatus } = useSocketStatus();
  const { setHop } = useHop();
  const { setRawMessage } = useRawMessage();

  const onConnectSocket = useCallback(
    (value: string) => {
      socket?.close();

      const currentSocket = new WebSocket(`${config.SOCKET_URL}`);

      currentSocket.onopen = () => {
        currentSocket.send(
          JSON.stringify({
            event: RouteSocketSendEvent.requestFindDomain,
            data: {
              domain: value,
            },
          })
        );
        setSocketStatus(SocketStatus.Start);
      };

      currentSocket.onclose = () => {
        setSocketStatus(SocketStatus.BeforeStart);
      };

      currentSocket.onmessage = (msg: MessageEvent) => {
        const parseData = JSON.parse(msg.data);
        if (!isMessage(parseData)) {
          throw new Error("is not Message Type");
        }

        const message: Message<any> = parseData;
        const { event, data } = message;
        if (event === RouteSocketReceiveEvent.hop) {
          setHop(data);
        }
        if (event === RouteSocketReceiveEvent.rawMessage) {
          setRawMessage(data);
        }
      };

      setSocket(currentSocket);
    },
    [setHop, setRawMessage, setSocket, setSocketStatus, socket]
  );

  const closeSocket = useCallback(() => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket?.close();
    } else {
      throw new Error("socket already closed!");
    }
  }, [socket]);

  return {
    onConnectSocket,
    closeSocket,
  };
};
