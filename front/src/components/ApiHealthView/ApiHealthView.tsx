import cx from 'classnames'
import {ApiHealth} from "../../types/ApiHealth";
import {API_NAME_MAP} from "../../constants";
import style from './ApiHealthView.module.scss';

type Props = {
    apiHealth: ApiHealth
}

function ApiHealthView({apiHealth}: Props){
    return <div className={style.ApiHealthView}>
        <div className={style.ApiHealthView__name}>
            {API_NAME_MAP[apiHealth.apiName] ?? ''}
        </div>
        <div className={cx(
            style.ApiHealthView__status,
            {
                [style['ApiHealthView__status--green']]: apiHealth.status === 0,
            },
            {
                [style['ApiHealthView__status--red']]: apiHealth.status !== 0,
            }
        )}>
        </div>
    </div>
}

export default ApiHealthView
