import SettingsIcon from '@mui/icons-material/Settings'
import {useAppSideNavigation} from "../../hooks/useAppSideNavigation";
import style from './OptionButton.module.scss';

function OptionButton(){

    const {toggle} = useAppSideNavigation();

    return <button onClick={toggle} className={style.OptionButton}>
        <SettingsIcon/>
    </button>

}

export default OptionButton;
