import "./rawDataview.css";
import styled from "styled-components";
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRawMessages } from "../../hooks/useRawMessages";
import { useRouteFinderSocket } from "../../hooks/useRouteFinderSocket";
import { CommandIterator } from "./commandIterator";

const RawMessage = styled.div`
  color: #d3d3d3;
  font-size: 16px;
`;

const CommandInput = styled.input`
  background-color: transparent;
  color: white;
  font-size: 16px;
  width: 100%;
  display: inline-block;
`;

export const RawDataView = () => {
  const { rawMessages, setRawMessages } = useRawMessages();
  const [command, setCommand] = useState<string>("");
  const scrollRef = useRef<null | HTMLInputElement>(null);
  const { closeSocket, onConnectSocket } = useRouteFinderSocket();
  const commandList = useRef<CommandIterator>(new CommandIterator());

  const onChangeCommand = useCallback((e) => {
    setCommand(e.target.value);
  }, []);

  const focusInput = useCallback(() => {
    scrollRef.current?.focus();
  }, []);

  const onKeyDown: KeyboardEventHandler = useCallback(
    (e) => {
      const { key } = e;
      if (key === "ArrowUp") {
        setCommand(commandList.current.previous());
        return;
      } else if (key === "ArrowDown") {
        setCommand(commandList.current.next());
        return;
      }
      if (key !== "Enter") return;
      const parsedCommand = command.split(" ");
      if (command === "IPTracer clear" || command === "clear") {
        setRawMessages([]);
      } else if (command === "IPTracer help" || command === "help") {
        setRawMessages((prev) =>
          prev.concat([
            `usage: 'IPTracer clear'`,
            `usage: 'IPTracer close'`,
            `usage: 'IPTracer start <host>'`,
          ])
        );
      } else if (command === "IPTracer close" || command === "close") {
        try {
          closeSocket();
          setRawMessages((prev) => prev.concat([`IPTracer close`]));
        } catch ({ message }) {
          setRawMessages((prev) => prev.concat([message as string]));
        }
      } else if (
        parsedCommand[0] === "IPTracer" &&
        parsedCommand[1] === "start" &&
        parsedCommand[2] != null
      ) {
        onConnectSocket(parsedCommand[2]);
      } else {
        setRawMessages((prev) =>
          prev.concat(
            `IPTracer: command not found: ${command}    'IPTracer help' 를 참고하십시오.`
          )
        );
      }
      commandList.current.add(command);
      commandList.current.moveEnd();
      setCommand("");
    },
    [closeSocket, command, onConnectSocket, setRawMessages]
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [rawMessages]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  return (
    <div id={"RawDataViewWrapper"} onClick={focusInput}>
      {rawMessages.map((_rawMessage, index) => {
        return <RawMessage key={index}>{_rawMessage}</RawMessage>;
      })}
      <CommandInput
        ref={scrollRef}
        value={command}
        type={"text"}
        onChange={onChangeCommand}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
