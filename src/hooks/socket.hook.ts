import {atom, useRecoilState} from "recoil";
import {useCallback} from "react";
import {config} from "../config";
import {RouteSocketReceiveEvent, RouteSocketSendEvent} from "../domain/socketEvents";
import {SocketStatus} from "../core/socket/status";
import {useSocketStatus} from "./routeSocketStatus.hook";
import {isMessage, Message} from "../core/socket/interfaces";
import {useHop} from "../domain/sockethooks/hop.hook";
import {useRawMessage} from "../domain/sockethooks/rawMessage.hook";


const routeSocketStatusState= atom<WebSocket | null>({
    key : "socket",
    default: null,
});

export const useSocket = () => {

    const [socket, setSocket] = useRecoilState(routeSocketStatusState);
    const { setSocketStatus } = useSocketStatus();
    const { setHop } = useHop();
    const { setRawMessage } = useRawMessage();

    const onConnectSocket = useCallback((value: string) => {
        socket?.close();

        const currentSocket = new WebSocket(`${config.SOCKET_URL}`);

        currentSocket.onopen = () => {
            currentSocket.send(JSON.stringify({
                event: RouteSocketSendEvent.requestFindDomain,
                data: {
                    domain: value
                },
            }));
            setSocketStatus(SocketStatus.Start);
        }

        currentSocket.onclose = () => {
            setSocketStatus(SocketStatus.BeforeStart);
        }

        currentSocket.onmessage = (msg : MessageEvent) => {
            const parseData = JSON.parse(msg.data);
            if(!isMessage(parseData)){
                throw new Error("is not Message Type");
            }

            const message : Message<any> = parseData;
            const {event, data} = message;
            if(event === RouteSocketReceiveEvent.hop){
                setHop(data);
            }
            if(event === RouteSocketReceiveEvent.rawMessage){
                setRawMessage(data);
            }
        }

        setSocket(currentSocket);
    }, [setHop, setRawMessage, setSocket, setSocketStatus, socket]);

    const closeSocket = useCallback(() => {
        if(socket?.readyState === WebSocket.OPEN){
            socket?.close();
        } else {
            throw new Error("socket already closed!")
        }
    }, [socket]);

    return {
        onConnectSocket,
        closeSocket,
    }
}