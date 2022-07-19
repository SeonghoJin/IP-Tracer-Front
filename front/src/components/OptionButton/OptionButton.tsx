import SettingsIcon from "@mui/icons-material/Settings";
import { useOptionTerminal } from "../../hooks/useOptionTerminal";
import style from "./OptionButton.module.scss";

function OptionButton() {
  const { toggle } = useOptionTerminal();

  return (
    <button onClick={toggle} className={style.OptionButton}>
      <SettingsIcon />
    </button>
  );
}

export default OptionButton;
