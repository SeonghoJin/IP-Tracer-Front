import {ChangeEventHandler, FC, KeyboardEventHandler, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {config} from "../config";

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


export const Search: FC = () => {

    const [search, setSearch] = useState<string>("");
    const socketRef = useRef<null | WebSocket>(null);

    const onConnectSocket = useCallback((value: string) => {
        socketRef.current?.close();
        socketRef.current = new WebSocket(`${config.SOCKET_URL}`);

        if(socketRef.current != null){
            socketRef.current.onopen = () => {
                socketRef.current?.send(value);
                console.log("open");
            }
            socketRef.current.onclose = () => {
                console.log("close");
            }
            socketRef.current.onmessage = (msg) => {
                console.log(msg);
            }
        }

    }, [])

    const onKeyPress : KeyboardEventHandler = useCallback((event) => {
        if(event.key !== 'Enter'){
            return;
        }
        onConnectSocket(search);
        setSearch("");
    }, [onConnectSocket, search]);


    const onChangeSearch: ChangeEventHandler = useCallback((event) => {
        event.preventDefault();
        setSearch((event.target as HTMLInputElement).value);
    }, [])

    return <SearchView onKeyPress={onKeyPress} value={search} onChangeSearch={onChangeSearch}/>
}

type SearchProps = {
    onKeyPress: KeyboardEventHandler;
    value: string;
    onChangeSearch: ChangeEventHandler
}

export const SearchView: FC<SearchProps> = ({onKeyPress, value, onChangeSearch}) => {

    const ref = useRef<null | HTMLInputElement>(null);

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return (<SearchWrapper>
        <Input type="text"
               placeholder={"궁금한 도메인을 입력하세요. ex. naver.com"}
               onChange={onChangeSearch}
               onKeyPress={onKeyPress}
               value={value}
               ref={ref}
        />
    </SearchWrapper>)
}
