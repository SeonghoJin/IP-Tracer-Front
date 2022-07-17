import { Button, Splitter } from '../Styled';
import style from './OptionTerminalHeader.module.scss';

function OptionTerminalHeader({}){
    return  <div className={style.OptionTerminalHeader}>
        <Button>
            BackgroundColor
        </Button>
        <Splitter />
        <Button>
            PixelColor
        </Button>
        <Splitter />
    </div>
}

export default OptionTerminalHeader;
