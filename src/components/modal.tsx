import { FC } from "react";
import styled, { keyframes } from "styled-components";

type ModalProps = {
  active: boolean;
  header: string;
  onClose?: any;
  onSuccess?: any;
};

const upAnimation = keyframes`
    0% {
      transform: translateY(100vh);
    }
    100% {
      transform: translateY(0);
    }
`;

const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  width: 300px;
  height: 400px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${upAnimation} 0.5s 1;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 10%;
  background-color: #e2e2e2;
  border-bottom: 1px solid #d3d3d3;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalMain = styled.div`
  width: 100%;
  height: 90%;
`;

const HeaderGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  margin-left: 10px;
`;

const SuccessButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: #90ee90;
  border-radius: 50%;
`;

export const Modal: FC<ModalProps> = ({
  children,
  active,
  header,
  onClose,
  onSuccess,
}) => {
  return (
    (active && (
      <ModalBackGround>
        <ModalWrapper>
          <ModalHeader>
            <HeaderGroup>{header}</HeaderGroup>
            {(onSuccess || onClose) && (
              <HeaderGroup>
                {onSuccess && <SuccessButton onClick={onSuccess} />}
                {onClose && <CloseButton onClick={onClose} />}
              </HeaderGroup>
            )}
          </ModalHeader>
          <ModalMain>{children}</ModalMain>
        </ModalWrapper>
      </ModalBackGround>
    )) || <></>
  );
};

Modal.defaultProps = {
  onClose: undefined,
  onSuccess: undefined,
};
