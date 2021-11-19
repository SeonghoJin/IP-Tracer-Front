import {FC, useEffect, useState} from "react";
import styled from "styled-components";
import "./description.css"
import {sleep} from "../../util/util";

const DescriptionWrapper = styled.div`
    font-size: 14px;
`

type DescriptionProps = {
    searchingFlag: boolean;
}

export const Description : FC<DescriptionProps> = ({searchingFlag}) => {

    return (<DescriptionWrapper className={`Description ${searchingFlag && "active"}`}>
        궁금한 도메인의 라우팅 경로를 알아보세요.
    </DescriptionWrapper>)
}