import { useEffect, useState, useRef } from "react";
import gqlFetch from "./gqlFetch";
import settings from "./settings";

export default <T>(
  query: string,
  wait?: boolean,
  variables?: { [key: string]: string },
  operationName?: string,
  options?: { [key: string]: string }
): [T, () => void, boolean, IGqlError] => {
  const [results, setResults] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IGqlError>();
  const [disabled, toggleDisabled] = useState(wait !== null ? wait : false);
  const [num, setNum] = useState(0);

  const runQuery = () => setNum(num + 1);

  useEffect(() => {
    if (num > 0) {
      setError(null);
      setLoading(true);
      gqlFetch<T>(query, variables, operationName, options)
        .then(data => {
          setLoading(false);
          setResults(data);
        })
        .catch((err: IGqlError) => {
          setLoading(false);
          if (err.res.toString().includes("TypeError: ")) {
            const error: Response = {
              status: 500,
              statusText: err.toString(),
              headers: null,
              ok: false,
              redirected: null,
              trailer: null,
              type: null,
              url: settings.url,
              clone: null,
              body: null,
              bodyUsed: null,
              arrayBuffer: null,
              blob: null,
              formData: null,
              json: null,
              text: null
            };
            setError({ res: error, body: null });
          } else setError(err);
        });
    }
  }, [num]);

  useEffect(() => {
    if (!disabled) setNum(num + 1);
  }, [query, disabled, variables, operationName, options]);

  return [results, runQuery, loading, error];
};
