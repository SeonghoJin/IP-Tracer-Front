import ColorPicker from "../ColorPicker";
import { useMapBackgroundColor } from "../../hooks/useMapBackgroundColor";
import style from "./BackgroundOption.module.scss";

function BackgroundOption() {
  const { backgroundColor, setBackgroundColor } = useMapBackgroundColor();

  return (
    <div className={style.DotColorOption}>
      <ColorPicker
        onChange={(hex) => {
          setBackgroundColor(hex);
        }}
        initialColor={backgroundColor}
      />
    </div>
  );
}

export default BackgroundOption;
