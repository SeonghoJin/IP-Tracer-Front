import style from "../DotColorOption/DotColorOption.module.scss";
import ColorPicker from "../ColorPicker";
import {useMapBackgroundColor} from "../../hooks/useMapBackgroundColor";

function BackgroundOption({}){

    const {setBackgroundColor} = useMapBackgroundColor();

    return <div className={style.DotColorOption}>
        <ColorPicker onChange={(hex) => {setBackgroundColor(hex)}}/>
    </div>
}

export default BackgroundOption;
