import React, { useRef } from "react";
import { debounce } from "../utils/debounce";
import { useSearch } from "../utils/usesearch";
import { useKeyDown } from '../utils/usekeydown'

const TIME_TO_WAIT_FINISH_PROPAGATION_KEY_EVENT_IN_MS = 50

export function SearchInput() {
  const search = useSearch();
  const inputRef = useRef<HTMLInputElement>(null)

  useKeyDown((key) => {
    if(key === '/') {
      setTimeout(() => {
        inputRef.current?.focus?.()
      }, TIME_TO_WAIT_FINISH_PROPAGATION_KEY_EVENT_IN_MS)
    }

    if(key === 'Escape') {
      inputRef.current?.blur?.()
    }
  })

  const debouncedOnSearch = React.useCallback(
    debounce((query: string) => {
      search.setQuery(query);
    }, 500),
    [],
  );
  React.useEffect(() => {
    setInputQuery(search.query);
  }, []);

  const [inputQuery, setInputQuery] = React.useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputQuery(query);
    debouncedOnSearch(query);
  };
  return (
    <input
      ref={inputRef}
      type="text"
      aria-label="search"
      className="px2 py1"
      placeholder="🔍 / Search Icons"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      value={inputQuery}
      onChange={onChange}
    />
  );
}
