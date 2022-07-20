import {useEffect, useState} from "react";
import { ToastOption } from "../../types/ToastOption";
import {sleep} from "../../util/sleep";
import Toast from "../Toast";
import {useUnsafeWaitingToasts} from "../../hooks/useUnsafeWaitingToasts";

function UnsafeToastContainer(){
    const [waiting, setWaiting] = useState(false);
    const [currentToast, setCurrentToast] = useState<ToastOption | null>(null);
    const [start, setStart] = useState(false);
    const {toastOptions, subscribe, clear} = useUnsafeWaitingToasts();

    useEffect(() => {
        subscribe(() => {
            setStart(true);
        })

        return () => {
            clear();
        }
    }, [])

    useEffect(() => {
        if(toastOptions.length === 0 && waiting === false){
            setStart(false);
            setCurrentToast(null);
        }

        if(toastOptions.length === 0){
            return;
        }

        if(waiting){
            return;
        }

        setWaiting(true);

        const firstToast = toastOptions.shift()!;
        setCurrentToast(firstToast);
        (async () => {
            await sleep(firstToast.time);
            setWaiting(false);
            setStart(false);
        })();
    }, [waiting, start]);

    return <>{currentToast && <Toast toastOption={currentToast}/>}</>;
}

export default UnsafeToastContainer;
