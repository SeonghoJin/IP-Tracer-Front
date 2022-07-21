import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import GithubIcon from "../../static/images/GitHub-Mark-Light-32px.png";
import { useEmailService } from "../../hooks/useEmailService";
import { Group } from "../Styled";
import { Modal } from "../Modal/Modal";
import { useToast } from "../../hooks/useToast";
import { useOpinionModal } from "../../hooks/useOpinionModal";
import SendEmailGuide from "../SendEmailGuide";
import style from "./Footer.module.scss";

const Button = styled.button`
  color: white;
  font-size: 14px;
`;

const OpinionTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  font-size: 14px;
  border: 0;
  font-weight: bold;
`;

function Footer() {
  const [opinionModalFlag, setOpinionModalFlag] = useOpinionModal();
  const toast = useToast();
  const { sendEmail } = useEmailService();
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onToggleOpinionModal: MouseEventHandler = useCallback(() => {
    setOpinionModalFlag((prev) => !prev);
  }, []);

  const onSuccess = useCallback(async (value) => {
    setOpinionModalFlag((prev) => !prev);
    if (value !== "") {
      try {
        await sendEmail(value);
        toast({ text: "의견을 보내주어 감사합니다." });
        toast({ text: "더 나은 서비스를 제공하는 IPTracer가 되겠습니다." });
      } catch (e) {
        toast({ text: "서버 에러로 인해 의견을 보내기가 어렵습니다." });
      }
    }
  }, []);

  return (
    <div className={style.FooterWrapper}>
      <Group>
        <Button onClick={onToggleOpinionModal}>의견 보내기</Button>
      </Group>
      <Modal
        active={opinionModalFlag}
        header={"의견 보내기"}
        onSuccess={() => {
          onSuccess(ref.current?.value || "");
        }}
        onClose={onToggleOpinionModal}
      >
        <OpinionTextArea
          ref={ref}
          placeholder={"개선할 필요성이 있는 부분을 의견으로 전달해주세요!"}
          maxLength={100}
        />
      </Modal>
      <SendEmailGuide />
      <Group>
        <a href={"https://github.com/SeonghoJin"} target={"_blank"}>
          <img src={GithubIcon} />
        </a>
      </Group>
    </div>
  );
}

export default Footer;
