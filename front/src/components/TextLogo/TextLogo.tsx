import cx from 'classnames';
import style from "./TextLogo.module.scss";

type Props = {
  searchingFlag: boolean;
};

function TextLogo({ searchingFlag }: Props) {
  return (
    <div className={cx(style.TextLogo, {
        [style['TextLogo--active']]: searchingFlag
    })}>
      <span className={cx(style.TextLogo__IpWrapper, {
        [style['TextLogo__IpWrapper--active']]: searchingFlag
      })}>IP</span>
      <span>Tracer</span>
    </div>
  );
}

export default TextLogo;
