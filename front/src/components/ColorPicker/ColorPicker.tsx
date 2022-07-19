import { SketchPicker } from "react-color";
import { useState } from "react";
import style from "./ColorPicker.module.scss";

type Props = {
  onChange: (hex: string) => void;
  initialColor: string;
};

function ColorPicker({ onChange, initialColor }: Props) {
  const [color, setColor] = useState(initialColor);

  return (
    <div className={style.ColorPicker}>
      <SketchPicker
        color={color}
        onChange={(e) => {
          setColor(e.hex);
          onChange(e.hex);
        }}
        className={style.ColorPicker__photoshop_color_picker}
      />
    </div>
  );
}

export default ColorPicker;
