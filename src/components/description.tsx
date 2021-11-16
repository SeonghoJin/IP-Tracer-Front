import {FC} from "react";
import styled from "styled-components";

const DescriptionWrapper = styled.div`
    font-size: 14px;
`

export const Description : FC = () => {
    return <DescriptionWrapper>
        궁금한 도메인의 라우팅 경로를 알아보세요.
    </DescriptionWrapper>
}