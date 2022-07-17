import cx from 'classnames';
import {useAppSideNavigation} from "../../hooks/useAppSideNavigation";
import style from './AppSideBar.module.scss';

function AppSideBar(){

    const {isOpen} = useAppSideNavigation();

    return <>
        <div className={cx(style.SideNavigation, {
            [style['SideNavigation--open']]: isOpen,
            [style['SideNavigation--close']]: !isOpen
        })}>
            SideBar
        </div>
    </>
}

export default AppSideBar;
