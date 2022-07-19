import cx from 'classnames';
import {useMapDotType} from "../../hooks/useMapDotType";
import style from './InputDotType.module.scss';

function InputDotType(){

    const {setMapDotType, mapDotType} = useMapDotType();

    const onClick = () => {
        if(mapDotType === 'circle'){
            setMapDotType('rectangular')
            return;
        }

        if(mapDotType === 'rectangular'){
            setMapDotType('circle');
            return;
        }
    }

    return <div className={style.InputDotType}>
        <div className={style.InputDotType__label}>
            점 타입
        </div>
        <div className={style.InputDotType__input}>
            <div className={cx(style.InputDotType__shape, {
                [style['InputDotType__shape--circle']]: mapDotType === 'circle',
                [style['InputDotType__shape--rectangular']]: mapDotType === 'rectangular'
            })}
                 onClick={onClick}
            >
            </div>
        </div>
    </div>
}

export default InputDotType;
