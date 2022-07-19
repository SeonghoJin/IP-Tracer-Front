import {atom} from "recoil";
import { ToastOption } from "../types/ToastOption";

export const toastWaitState = atom<ToastOption[]>({
    key: 'toastWaitState',
    default: [],
});

