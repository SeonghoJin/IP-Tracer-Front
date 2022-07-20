import { useEffect } from "react";
import { useVisitService } from "../../hooks/useVisitService";
import { useOpinionModal } from "../../hooks/useOpinionModal";
import { useToast } from "../../hooks/useToast";

function SendEmailGuide() {
  const visitService = useVisitService();
  const [opinionModalFlag] = useOpinionModal();
  const toast = useToast();

  useEffect(() => {
    if (
      opinionModalFlag === true &&
      visitService.isVisitSendOpinion() === false
    ) {
      toast({ text: "의견 작성 후, 초록색 버튼을 눌러주세요.", force: true });
    }
  }, [opinionModalFlag]);
  return null;
}

export default SendEmailGuide;
