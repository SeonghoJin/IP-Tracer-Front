import { OptionTerminalViewTypes } from "../../constants";
import DotOption from "../DotOption";
import BackgroundOption from "../BackgroundOption";
import DotColorOption from "../DotColorOption";
import style from "./OptionTerminalBody.module.scss";

type Props = {
  selectedView: OptionTerminalViewTypes;
};

function OptionTerminalBody({ selectedView }: Props) {
  return (
    <div className={style.OptionTerminalBody}>
      {selectedView === OptionTerminalViewTypes.Dot && <DotOption />}
      {selectedView === OptionTerminalViewTypes.Background && (
        <BackgroundOption />
      )}
      {selectedView === OptionTerminalViewTypes.DotColor && <DotColorOption />}
    </div>
  );
}

export default OptionTerminalBody;
