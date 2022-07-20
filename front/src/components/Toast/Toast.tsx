import { ToastOption } from "../../types/ToastOption";
import style from "./Toast.module.scss";

type Props = {
  toastOption: ToastOption;
};

function Toast({ toastOption }: Props) {
  return (
    <div className={style.Toast} style={{
        width: toastOption.width ?? 'initial'
    }}>
      <div className={style.Toast__background}></div>
      <div className={style.Toast__text}>{toastOption.text}</div>
    </div>
  );
}

export default Toast;
