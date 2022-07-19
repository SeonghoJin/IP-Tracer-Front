import { useMapPixelColor } from "../../hooks/useMapPixelColor";
import ColorPicker from "../ColorPicker";
import style from "./DotColorOption.module.scss";

function DotColorOption() {
  const { pixelColor, setPixelColor } = useMapPixelColor();

  return (
    <div className={style.DotColorOption}>
      <ColorPicker
        onChange={(e) => {
          setPixelColor(e);
        }}
        initialColor={pixelColor}
      />
    </div>
  );
}

export default DotColorOption;
