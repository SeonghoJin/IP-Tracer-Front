import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cx from 'classnames';
import { useRouteFinderSocket } from "../../hooks/useRouteFinderSocket";
import style from "./Search.module.scss";

type Props = {
  setSearchingFlag: (flag: boolean) => void;
  searchFlag: boolean;
};

function Search({ setSearchingFlag, searchFlag }: Props){
  const [search, setSearch] = useState<string>("");
  const ref = useRef<null | HTMLInputElement>(null);
  const { onConnectSocket } = useRouteFinderSocket();

  const onKeyPress: KeyboardEventHandler = useCallback(
    (event) => {
      if (search.trim() === "") return;
      if (event.key !== "Enter") {
        return;
      }
      onConnectSocket(search);
      setSearch("");
      setSearchingFlag(true);
    },
    [onConnectSocket, search, setSearchingFlag]
  );

  const onChangeSearch: ChangeEventHandler = useCallback((event) => {
    event.preventDefault();
    setSearch((event.target as HTMLInputElement).value);
  }, []);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
      <div className={cx(style.SearchWrapper, {
        [style['SearchWrapper--active']]: searchFlag
      })}>
        <input
            className={style.Input}
            type="text"
            placeholder={"궁금한 도메인을 입력하세요. ex. naver.com"}
            onChange={onChangeSearch}
            onKeyPress={onKeyPress}
            value={search}
            ref={ref}
        />
      </div>
  );
}

export default Search;
