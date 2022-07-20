import { useEffect, useState } from "react";
import { ToastOption } from "../../types/ToastOption";
import { sleep } from "../../util/sleep";
import Toast from "../Toast";
import { useUnsafeWaitingToasts } from "../../hooks/useUnsafeWaitingToasts";
import { TOAST_TIME_INTERVAL_LONG } from "../../constants";

function UnsafeToastContainer() {
  const [waiting, setWaiting] = useState(false);
  const [currentToast, setCurrentToast] = useState<ToastOption | null>(null);
  const [start, setStart] = useState(false);
  const { toastOptions, subscribe, clear } = useUnsafeWaitingToasts();

  useEffect(() => {
    subscribe(() => {
      setStart(true);
    });

    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    if (toastOptions.length === 0 && waiting === false) {
      setStart(false);
      setCurrentToast(null);
    }

    if (toastOptions.length === 0) {
      return;
    }

    if (waiting) {
      return;
    }

    setWaiting(true);

    const firstToast = toastOptions.shift();

    if (!firstToast) {
      setCurrentToast(null);
      setWaiting(false);
      setStart(false);
      return;
    }

    setCurrentToast(firstToast);
    (async () => {
      await sleep(firstToast.time ?? TOAST_TIME_INTERVAL_LONG);
      setWaiting(false);
      setStart(false);
    })();
  }, [waiting, start]);

  return <>{currentToast && <Toast toastOption={currentToast} />}</>;
}

export default UnsafeToastContainer;
