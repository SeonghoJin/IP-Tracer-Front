import { useLayoutEffect, useState } from "react";
import { useMobileSupportService } from "../../hooks/useMobileSupportService";
import MobileAlarmContent from "../MobileAlarmContent";
import { useToast } from "../../hooks/useToast";
import style from "./MobileAlarm.module.scss";

function MobileAlarm() {
  const mobileSupportService = useMobileSupportService();
  const [showMobileAlarm, setShowMobileAlarm] = useState(false);
  const toast = useToast();

  useLayoutEffect(() => {
    setShowMobileAlarm(!mobileSupportService.usingAppIfSizeIsMobile());
  }, []);

  const onClick = () => {
    mobileSupportService.yesUsingAppIfSizeIsMobile();
    setShowMobileAlarm(false);
    toast({
      text: "사용에 불편한 점이 있다면, 의견을 보내주세요.",
    });
  };

  return (
    <>
      {showMobileAlarm && (
        <div className={style.MobileAlarm}>
          <MobileAlarmContent />
          <div className={style.MobileAlarm__text}>
            IPTracer는 데스크톱 환경만 고려한 앱입니다.
            <br />
            현재 환경에서는 사용하기 어렵습니다.
            <br />
            그래도 사용하시겠습니까?
          </div>
          <button className={style.MobileAlarm__button} onClick={onClick}>
            사용하기
          </button>
        </div>
      )}
    </>
  );
}

export default MobileAlarm;
