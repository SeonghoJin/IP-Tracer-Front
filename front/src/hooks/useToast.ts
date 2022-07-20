import {ToastOption} from "../types/ToastOption";
import {useUnsafeWaitingToasts} from "./useUnsafeWaitingToasts";

let beforeToastOptions: any[] = []

export const useToast = () => {
    const {toastOptions, notify} = useUnsafeWaitingToasts();
    beforeToastOptions = toastOptions;

    const toast = (toastOption: ToastOption) => {
        toastOptions.push(toastOption);
        notify();
    }

    return toast;
}
