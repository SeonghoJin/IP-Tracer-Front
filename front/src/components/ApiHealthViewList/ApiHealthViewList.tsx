import {useApiHealths} from "../../hooks/useApiHealths";
import ApiHealthView from "../ApiHealthView";
import {useToast} from "../../hooks/useToast";
import style from './ApiHealthViewList.module.scss'

function ApiHealthViewList(){

    const [apiHealths] = useApiHealths();
    const toast = useToast();

    return <ul
        className={style.ApiHealthViewList}
        onClick={() => {
            toast({
                text: 'IPTracer가 IP의 위치를 알아 내기 위해 사용하는 외부 API입니다.',
                force: true,
                time: 4000,
            });
            toast({
                text: '빨간색인 API가 많을 경우 제대로 위치를 알아내지 못 할 수 있습니다.',
                time: 4000,
            });

        }}
    >
        {apiHealths.map((apiHealth) => {
            return <li key={apiHealth.apiName}>
                <ApiHealthView apiHealth={apiHealth}/>
            </li>
        })}
    </ul>
}

export default ApiHealthViewList;
