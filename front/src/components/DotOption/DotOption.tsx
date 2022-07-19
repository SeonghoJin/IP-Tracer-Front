import InputDotPixel from "../InputDotPixel";
import InputGapSize from "../InputGapSize";
import InputDotType from "../InputDotType";
import style from "./DotOption.module.scss";

function DotOption({}) {
  return (
    <div className={style.DotOption}>
      <div className={style.DotOption__left}>
        <div className={style.DotOption__left__top}>
          <InputDotPixel />
        </div>
        <div className={style.DotOption__left__bottom}>
          <InputGapSize />
        </div>
      </div>
      <div className={style.DotOption__right}>
        <InputDotType />
      </div>
    </div>
  );
}

export default DotOption;
