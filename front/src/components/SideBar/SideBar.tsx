import cx from 'classnames';
import style from './SideBar.module.scss';

type Props = {
    isOpen: boolean;
}

function SideBar({isOpen}: Props){

    return <div className={cx(style.SideNavigation, {
        [style['SideNavigation--open']]: isOpen,
        [style['SideNavigation--close']]: !isOpen
    })}>
        SideNavigation
    </div>
}

export default SideBar;
