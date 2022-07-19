import cx from "classnames";
import style from "./Description.module.scss";

type Props = {
  searching: boolean;
};

function Description({ searching }: Props) {
  return (
    <div
      className={cx(style.Description, {
        [style["Description--active"]]: searching,
      })}
    >
      궁금한 도메인의 라우팅 경로를 알아보세요.
    </div>
  );
}

export default Description;
