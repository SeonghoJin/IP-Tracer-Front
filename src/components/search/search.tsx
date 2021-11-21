import {ChangeEventHandler, FC, KeyboardEventHandler, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {config} from "../../config";
import "./search.css";
import {useHop} from "../../domain/sockethooks/hop.hook";
import {RouteSocketReceiveEvent, RouteSocketSendEvent} from "../../domain/socketEvents";
import {isMessage, Message} from "../../core/socket/interfaces";
import {useRawMessage} from "../../domain/sockethooks/rawMessage.hook";

const SearchWrapper = styled.div`
  width: 560px;
  height: 45px;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 2px solid rgba(74, 79, 90, 0.8);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
`
type SearchProps = {
    setSearchingFlag: (flag : boolean) => void;
    searchFlag: boolean;
}

export const Search: FC<SearchProps> = ({setSearchingFlag, searchFlag}) => {

    const [search, setSearch] = useState<string>("");
    const { setHop } = useHop();
    const { setRawMessage } = useRawMessage();
    const socketRef = useRef<null | WebSocket>(null);

    const onConnectSocket = useCallback((value: string) => {
        socketRef.current?.close();
        socketRef.current = new WebSocket(`${config.SOCKET_URL}`);

        if(socketRef.current != null){
            socketRef.current.onopen = () => {
                socketRef.current?.send(JSON.stringify({
                    event: RouteSocketSendEvent.requestFindDomain,
                    data: {
                        domain: value
                    },
                }));
                console.log("open");
            }
            socketRef.current.onclose = () => {
                console.log("close");
            }
            socketRef.current.onmessage = (msg : MessageEvent) => {
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
        }

    }, [setHop, setRawMessage]);

    const onKeyPress : KeyboardEventHandler = useCallback((event) => {
        if(search.trim() === "")return;
        if(event.key !== 'Enter'){
            return;
        }
        onConnectSocket(search);
        setSearch("");
        setSearchingFlag(true);
    }, [onConnectSocket, search, setSearchingFlag]);


    const onChangeSearch: ChangeEventHandler = useCallback((event) => {
        event.preventDefault();
        setSearch((event.target as HTMLInputElement).value);
    }, [])

    return <SearchView onKeyPress={onKeyPress} value={search} onChangeSearch={onChangeSearch} searchFlag={searchFlag}/>
}

type SearchViewProps = {
    onKeyPress: KeyboardEventHandler;
    value: string;
    onChangeSearch: ChangeEventHandler;
    searchFlag: boolean;
}

export const SearchView: FC<SearchViewProps> = ({onKeyPress, value, onChangeSearch, searchFlag}) => {

    const ref = useRef<null | HTMLInputElement>(null);

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return (<SearchWrapper className={`SearchWrapper ${searchFlag && 'active'}`}>
        <Input type="text"
               placeholder={"궁금한 도메인을 입력하세요. ex. naver.com"}
               onChange={onChangeSearch}
               onKeyPress={onKeyPress}
               value={value}
               ref={ref}
        />
    </SearchWrapper>)
}
