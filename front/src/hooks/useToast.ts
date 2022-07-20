import { ToastOption } from "../types/ToastOption";
import { useUnsafeWaitingToasts } from "./useUnsafeWaitingToasts";


export const useToast = () => {
  const { insert } = useUnsafeWaitingToasts();

  const toast = (toastOption: ToastOption) => {
    insert(toastOption);
  };

  return toast;
};
