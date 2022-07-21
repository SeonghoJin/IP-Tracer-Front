import {useCallback, useEffect, useState} from "react";
import {throttle} from "../util/throttle";

export const useScreenSize = () => {
    const [size, setSize] = useState<{
        width: number,
        height: number
    }>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const onResize = useCallback(throttle(() => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }, 50), [])

    useEffect(() => {
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])

    return size;
}
