import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cx from "classnames";
import { useRouteFinderSocket } from "../../hooks/useRouteFinderSocket";
import { useDomainSearch } from "../../hooks/useDomainSearch";
import style from "./Search.module.scss";

function Search() {
  const [search, setSearch] = useState<string>("");
  const [searchState, setSearchState] = useDomainSearch();
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
      setSearchState({
        search,
        searching: true,
      });
    },
    [onConnectSocket, search, setSearchState]
  );

  const onChangeSearch: ChangeEventHandler = useCallback((event) => {
    event.preventDefault();
    setSearch((event.target as HTMLInputElement).value);
  }, []);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      className={cx(style.SearchWrapper, {
        [style["SearchWrapper--active"]]: searchState.searching,
      })}
    >
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
