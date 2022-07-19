import SliderInput from "../SliderInput";
import {PIXEL_MAX_SIZE, PIXEL_MIN_SIZE} from "../../constants";
import {useMapPixelSize} from "../../hooks/useMapPixelSize";
import style from './InputDotPixel.module.scss';

function InputDotPixel(){

    const {mapPixelSize, setMapPixelSize} = useMapPixelSize();

    return <div className={style.InputDotPixel}>
        <div className={style.InputDotPixel__label}>
            점 크기
        </div>
        <div className={style.InputDotPixel__input}>
            <SliderInput
                min={PIXEL_MIN_SIZE}
                max={PIXEL_MAX_SIZE}
                defaultValue={mapPixelSize}
                step={1}
                onChange={(e) => {
                    setMapPixelSize(parseInt(e.target.value));
                }}/>
        </div>
    </div>
}

export default InputDotPixel;
