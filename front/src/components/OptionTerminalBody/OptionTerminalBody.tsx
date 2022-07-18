import {OptionTerminalViewTypes} from "../../constants";
import style from './OptionTerminalBody.module.scss';

type Props = {
    selectedView: OptionTerminalViewTypes
}

function OptionTerminalBody({selectedView}: Props){
    return <div className={style.OptionTerminalBody}>option-terminal-body</div>
}

export default OptionTerminalBody;
