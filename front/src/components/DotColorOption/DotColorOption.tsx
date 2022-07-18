import {useMapPixelColor} from "../../hooks/useMapPixelColor";
import ColorPicker from "../ColorPicker";
import style from './DotColorOption.module.scss'

function DotColorOption({}){
    const {setPixelColor, isError} = useMapPixelColor();


    return <div className={style.DotColorOption}>
        <ColorPicker onChange={(e) => {setPixelColor(e)}}/>
    </div>
}

export default DotColorOption;
