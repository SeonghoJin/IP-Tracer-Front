import {useRawMessages} from "../../hooks/rawMessages.hooks";
import "./rawDataview.css";
import styled from "styled-components";
import {KeyboardEventHandler, useCallback, useEffect, useRef, useState} from "react";

const RawMessage = styled.div`
    color: #d3d3d3;
  font-size: 16px;
`

const CommandInput = styled.input`
    background-color: transparent;
  color: white;
  font-size: 16px;
  width: 100%;
  display: inline-block;
`

export const RawDataView = () => {
    const {rawMessages, setRawMessages} = useRawMessages();
    const [command, setCommand] = useState<string>("");
    const scrollRef = useRef<null | HTMLInputElement>(null);

    const onChangeCommand = useCallback((e) => {
        setCommand(e.target.value);
    }, []);

    const focusInput = useCallback(() => {
        scrollRef.current?.focus();
    }, []);

    const onKeyPress : KeyboardEventHandler = useCallback((e) => {
        const {key} = e;
        if(key !== 'Enter')return;
        if(command === 'IPTracer clear' || command === 'clear'){
            setRawMessages([]);
        } else if(command === 'IPTracer help'){
            setRawMessages((prev) => prev.concat(`usage: IPTracer clear or clear`));
        }else{
            setRawMessages((prev) => prev.concat(`IPTracer: command not found: ${command}. 'IPTracer help' 를 참고하십시오.`));
        }
        setCommand("");
    }, [command, setRawMessages])

    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [rawMessages]);


    useEffect(() => {
        focusInput();
    }, [focusInput])

    return <div id={"RawDataViewWrapper"} onClick={focusInput}>{
        rawMessages.map((_rawMessage, index) => {
            return <RawMessage key={index}>{_rawMessage}</RawMessage>
        })
    }
    <CommandInput ref={scrollRef} value={command} type={"text"} onChange={onChangeCommand} onKeyPress={onKeyPress}/>
    </div>
}