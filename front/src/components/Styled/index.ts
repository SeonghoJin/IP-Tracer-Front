import styled from "styled-components";
import OptionButton from "../OptionButton";

export const Group = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const SpanGroup = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const Span = styled.span`
  font-size: 14px;
  color: white;
`;

export const Button = styled.button`
  width: 90px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  color: #4a4f5a;
`;

export const Splitter = styled.div`
  height: 100%;
  border-right: 1px solid #d3d3d3;
`;

export const RemoveButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
`;

export const ContentLayout = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
