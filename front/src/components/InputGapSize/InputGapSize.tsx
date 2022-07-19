import SliderInput from "../SliderInput";
import { PIXEL_MAX_GAP_SIZE, PIXEL_MIN_GAP_SIZE } from "../../constants";
import { useMapGapSize } from "../../hooks/useMapGapSize";
import style from "./InputGapSize.module.scss";

function InputGapSize() {
  const { mapGapSize, setMapGapSize } = useMapGapSize();

  return (
    <div className={style.InputGapSize}>
      <div className={style.InputGapSize__label}>점 간격 크기</div>
      <div className={style.InputGapSize__input}>
        <SliderInput
          min={PIXEL_MIN_GAP_SIZE}
          max={PIXEL_MAX_GAP_SIZE}
          defaultValue={mapGapSize}
          step={1}
          onChange={(e) => {
            setMapGapSize(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

export default InputGapSize;
