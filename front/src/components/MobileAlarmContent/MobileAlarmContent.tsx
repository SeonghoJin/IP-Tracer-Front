import {ReactDotMap} from "@dot-map-renderer/react";
import cx from "classnames";
import {useMapDotType} from "../../hooks/useMapDotType";
import {useMapPixelSize} from "../../hooks/useMapPixelSize";
import {useMapGapSize} from "../../hooks/useMapGapSize";
import {PIXEL_MAX_GAP_SIZE, PIXEL_MAX_SIZE, PIXEL_MIN_GAP_SIZE, PIXEL_MIN_SIZE} from "../../constants";
import SliderInput from "../SliderInput";
import style from './MobileAlarmContent.module.scss';

function MobileAlarmContent(){

    const {mapDotType, setMapDotType} = useMapDotType();
    const {mapPixelSize, setMapPixelSize} = useMapPixelSize();
    const {mapGapSize, setMapGapSize} = useMapGapSize();

    const onClick = () => {

        if (mapDotType === "circle") {
            setMapDotType("rectangular");
            return;
        }

        if (mapDotType === "rectangular") {
            setMapDotType("circle");
            return;
        }
    };

    return <div className={style.MobileAlarmContent}>
        <ReactDotMap
            className={style.MobileAlarmContent__map}
            anchors={[]}
            lines={[]}
            options={{
                dotType: mapDotType,
                pixelSize: mapPixelSize,
                gapSize: mapGapSize,
            }}
        />
        <div className={style.MobileAlarmContent__input_group}>
            <div className={style.MobileAlarmContent__input}>
                <div>
                    점 크기
                </div>
                    <SliderInput
                        min={PIXEL_MIN_SIZE}
                        max={PIXEL_MAX_SIZE}
                        defaultValue={mapPixelSize}
                        step={1}
                        onChange={(e) => {
                            setMapPixelSize(parseInt(e.target.value));
                        }}/>
            </div>
            <div className={style.MobileAlarmContent__input}>
                <div>
                    점 간격
                </div>
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
            <div className={style.MobileAlarmContent__input}>
                <div>
                    점 타입
                </div>
                <div className={style.InputDotType__wrapper}>
                <div
                    className={cx(style.InputDotType__shape, {
                        [style["InputDotType__shape--circle"]]: mapDotType === "circle",
                        [style["InputDotType__shape--rectangular"]]:
                        mapDotType === "rectangular",
                    })}
                    onClick={onClick}
                />
                </div>
            </div>
        </div>
    </div>
}

export default MobileAlarmContent;
