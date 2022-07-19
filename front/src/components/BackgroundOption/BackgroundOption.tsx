import style from "../DotColorOption/DotColorOption.module.scss";
import ColorPicker from "../ColorPicker";
import { useMapBackgroundColor } from "../../hooks/useMapBackgroundColor";

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
