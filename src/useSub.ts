import { useEffect, useState, useRef } from "react";
// @ts-ignore
import { graphQLSubscriber } from "@jetblack/graphql-client";
import settings from "./settings";



export default <T>(query: string, variables?: { [key: string]: string}, operationName?: string) => {
  const [data, setData] = useState<T>();
  const shutdown = useRef((): null => null);

  useEffect(() => {
    shutdown.current = graphQLSubscriber(
      settings.subUrl,
      settings.options,
      (error: any, subscribe: any) => {
        if (!(error || subscribe)) {
          // Normal closure.
          return;
        }
        if (error) {
          console.error(error);
          throw error;
        }
        subscribe(query, variables, operationName, (error: any, data: any) => {
          if (!(error || subscribe)) {
            // Normal closure
            return;
          }
          if (error) {
            console.error(error);
            throw error;
          }
          setData(data);
        });
      }
    );
    return () => {
      shutdown.current();
    };
  }, []);

  return data;
};
