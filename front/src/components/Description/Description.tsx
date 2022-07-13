import cx from 'classnames';
import style from "./Description.module.scss";

type Props = {
  searchingFlag: boolean;
};

function Description({ searchingFlag }: Props) {
  return (
    <div className={cx(style.Description, {
      [style['Description--active']]: searchingFlag
    })}>
      궁금한 도메인의 라우팅 경로를 알아보세요.
    </div>
  );
}

export default Description;
