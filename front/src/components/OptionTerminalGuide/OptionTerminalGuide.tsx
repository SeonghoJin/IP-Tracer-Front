import { useEffect } from "react";
import { useVisitService } from "../../hooks/useVisitService";
import { useOptionTerminal } from "../../hooks/useOptionTerminal";
import { useToast } from "../../hooks/useToast";

function OptionTerminalGuide() {
  const visitService = useVisitService();
  const { state } = useOptionTerminal();
  const toast = useToast();

  useEffect(() => {
    if (state === "open" && visitService.isVisitOptionTerminal() === false) {
      toast({
        text: "옵션 터미널은 움직일 수 있습니다. 탭을 드래그해보세요!",
        force: true,
        time: 10000
      });
    }
  }, [state]);

  return null;
}

export default OptionTerminalGuide;
