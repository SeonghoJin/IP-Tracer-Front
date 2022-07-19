import cx from "classnames";
import style from "./TextLogo.module.scss";

type Props = {
  searching: boolean;
};

function TextLogo({ searching }: Props) {
  return (
    <div
      className={cx(style.TextLogo, {
        [style["TextLogo--active"]]: searching,
      })}
    >
      <span
        className={cx(style.TextLogo__IpWrapper, {
          [style["TextLogo__IpWrapper--active"]]: searching,
        })}
      >
        IP
      </span>
      <span>Tracer</span>
    </div>
  );
}

export default TextLogo;
