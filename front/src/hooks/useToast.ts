import { ToastOption } from "../types/ToastOption";
import { useUnsafeWaitingToasts } from "./useUnsafeWaitingToasts";

export const useToast = () => {
  const { insert, removeAllToast } = useUnsafeWaitingToasts();

  const toast = (toastOption: ToastOption) => {
    if (toastOption?.force) {
      removeAllToast();
    }
    insert(toastOption);
  };

  return toast;
};
