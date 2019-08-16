import { useEffect, useState, useRef } from "react";
import gqlFetch from "./gqlFetch";

export default <T>(
  query: string,
  wait?: boolean,
  variables?: { [key: string]: string },
  operationName?: string,
  options?: { [key: string]: string }
): [T, () => void] => {
  const [results, setResults] = useState<T>();
  const [disabled, toggleDisabled] = useState(wait !== null ? wait : false);
  const [num, setNum] = useState(0);

  const runQuery = () => setNum(num + 1);

  useEffect(() => {
    if (num > 0)
      gqlFetch<T>(query, variables, operationName, options).then(data =>
        setResults(data)
      );
  }, [num]);

  useEffect(() => {
    if (!disabled) setNum(num + 1);
  }, [query, disabled, variables, operationName, options]);

  return [results, runQuery];
};
