import { Payload } from "../types/Payload";
import { Growth } from "./Growth";
import { ExponentialGrowth } from "./ExponentialGrowth";
import { LinearGrowth } from "./LinearGrowth";
import { sleep } from "./sleep";

type PoolingWhileFulfilledFunction = <
  T extends (...args: any[]) => Promise<any>
>(
  callback: T,
  option: {
    timeout?: number;
    isFulfilled: (response: Payload<ReturnType<T>>) => boolean;
    onError?: (err: unknown) => void;
    maxTry?: number;
    tryTimeType?: "linear" | "exponential";
  }
) => Promise<ReturnType<T> | null>;

export const poolingWhileFulfilled: PoolingWhileFulfilledFunction = (
  callback,
  {
    timeout = 3000,
    isFulfilled,
    onError = () => {},
    maxTry = 3,
    tryTimeType = "exponential",
  }
) => {
  return new Promise((res) => {
    const growth: Growth =
      tryTimeType === "exponential"
        ? new ExponentialGrowth()
        : new LinearGrowth();
    let currentTimeout = false;

    const timerId = setTimeout(() => {
      console.warn("timeout error");
      currentTimeout = true;
      res(null);
    }, timeout);

    (async () => {
      for (let i = 0; i < maxTry; i++) {
        if (currentTimeout) {
          return;
        }
        try {
          const response = await callback();
          if (isFulfilled(response)) {
            res(response);
            clearTimeout(timerId);
            break;
          }
        } catch (err) {
          onError(err);
          const nextTime = growth.next();
          await sleep(nextTime);
        }
      }
    })();
  });
};
