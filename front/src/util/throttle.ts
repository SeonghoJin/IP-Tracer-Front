export const throttle = (callback: () => void, time: number) => {

    let timerId: NodeJS.Timer | null = null;

    return () => {
        if(timerId){
            return;
        }

        timerId = setTimeout(() => {
            timerId = null;
            callback();
        }, time);
    }
}
