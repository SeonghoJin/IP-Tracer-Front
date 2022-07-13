type Payload<T extends Promise<any>> = T extends Promise<infer Payload> ? Payload : never;

type PoolingWhileFulfilledFunction = <T extends (...args: any[]) => (Promise<any>)>(
  callback: T, option: {
  timeout?: number,
  isFulfilled: (response: Payload<ReturnType<T>>) => boolean,
  onError?: (response: Payload<ReturnType<T>>) => void
}) => (Promise<ReturnType<T> | null>);

export const requestWhileFulfilled: PoolingWhileFulfilledFunction = (callback, {timeout = 30000, isFulfilled, onError = () => {}}) => {
  return new Promise((res) => {
    const timerId = setTimeout(() => {
      console.warn(`request timeout ${timeout}`);
      res(null);
    }, timeout);

    const time = 0;

    const recursive = async (time: number) => {
      setTimeout(async () => {

        const next = (response: any) => {
          if(isFulfilled(response)){
            clearTimeout(timerId);
            console.log("RESOLVE!");
            res(response);
          } else {
            onError(response);
            const nextTime = (1000 + time) * 2;
            recursive(nextTime);
          }
        }

        callback().then(next).catch(next);

      }, time);
    }

    recursive(time);
  })
}
