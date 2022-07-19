import {useEffect, useState} from "react";
import {useToastWaitState} from "../../hooks/useToastWaitState";
import { ToastOption } from "../../types/ToastOption";
import {sleep} from "../../util/sleep";

type Props = {
    waitTime: number
}

function ToastContainer({ waitTime }: Props){
    const [waitToasts, setWaitToasts] = useToastWaitState();
    const [waiting, setWaiting] = useState(false);
    const [currentToast, setCurrentToast] = useState<ToastOption | null>(null)

    useEffect(() => {
        if(waitToasts.length === 0){
            setCurrentToast(null);
            return;
        }

        if(waiting){
            return;
        }

        setWaiting(true);

        (async () => {
            const [firstToast] = waitToasts;
            if(firstToast){
                setCurrentToast(firstToast);
                await sleep(waitTime);
                setWaiting(false);
                setWaitToasts((waitToasts) => {
                    const [, ...restToast] = waitToasts;
                    return restToast;
                })
            }

        })();
    }, [waiting, waitTime, waitToasts]);

    return <div>{currentToast}</div>;
}

export default ToastContainer;
