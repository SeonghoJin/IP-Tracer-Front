import cx from 'classnames';
import TextLogo from "../TextLogo";
import RouteView from "../RouteView";
import Description from "../Description";
import Search from "../Search";
import {useDomainSearch} from "../../hooks/useDomainSearch";
import style from "./Content.module.scss";

function Content(){
    const [searchState] = useDomainSearch();
    const {searching} = searchState;

    return (
        <div className={style.ContentWrapper}>
            <div className={cx(style.ContentGroupWrapper,
                {[style['ContentGroupWrapper--active']] : searching}
            )}
            >
                <TextLogo searching={searching} />
                <Description searching={searching} />
                <div className={style.SearchLayout}>
                    <Search/>
                </div>
            </div>
            <RouteView/>
        </div>
    );
}

export default Content;
