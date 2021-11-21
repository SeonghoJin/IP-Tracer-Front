import {useRawMessages} from "../../hooks/rawMessages.hooks";
import "./rawDataview.css";
import styled from "styled-components";
import {useEffect, useRef} from "react";

const RawMessage = styled.div`
    color: #d3d3d3;
  font-size: 16px;
`

export const RawDataView = () => {
    const {rawMessages} = useRawMessages();

    const scrollRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [rawMessages]);

    return <div id={"RawDataViewWrapper"}>{
        rawMessages.map((_rawMessage, index) => {
            return <RawMessage key={index}>{_rawMessage}</RawMessage>
        })
    }
    <div ref={scrollRef}></div>
    </div>
}