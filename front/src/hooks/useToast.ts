import {ToastOption} from "../types/ToastOption";
import {useToastWaitState} from "./useToastWaitState";

export const useToast = () => {
    const [, setWaitToasts] = useToastWaitState();

    const toast = (toastOptions: ToastOption) => {
        setWaitToasts((waitToasts) => waitToasts.concat(toastOptions));
    }

    return toast;
}
