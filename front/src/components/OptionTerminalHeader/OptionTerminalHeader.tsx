import cx from 'classnames';
import {ContentLayout, RemoveButton, Splitter} from '../Styled';
import {useOptionTerminal} from "../../hooks/useOptionTerminal";
import {OptionTerminalViewTypes} from "../../constants/index";
import style from './OptionTerminalHeader.module.scss';

type Props = {
    selectedView: OptionTerminalViewTypes,
    changeViewType: (view: OptionTerminalViewTypes) => void;
}

function OptionTerminalHeader({ selectedView, changeViewType }: Props){

    const {off} = useOptionTerminal();

    return <div className={style.OptionTerminalHeader}>
        <div className={style.OptionTerminalHeader__left}>
            <button className={cx(style.OptionTerminalHeader__button, {
                [style['OptionTerminalHeader__button--active']]: selectedView === OptionTerminalViewTypes.Background
            })}
                onClick={() => {changeViewType(OptionTerminalViewTypes.Background)}}
            >
                {OptionTerminalViewTypes.Background}
            </button>
            <Splitter />
            <button className={cx(style.OptionTerminalHeader__button, {
                [style['OptionTerminalHeader__button--active']]: selectedView === OptionTerminalViewTypes.Dot
            })}
                onClick={() => {changeViewType(OptionTerminalViewTypes.Dot)}}
            >
                {OptionTerminalViewTypes.Dot}
            </button>
            <Splitter />
        </div>
        <div className={style.OptionTerminalHeader__right}>
            <ContentLayout>
                <RemoveButton onClick={off}/>
            </ContentLayout>
        </div>
    </div>
}

export default OptionTerminalHeader;
