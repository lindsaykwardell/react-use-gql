import settings from "./settings";

export default <T>(
  query: string,
  variables?: { [key: string]: string },
  operationName?: string,
  options?: { [key: string]: string }
): Promise<T> =>
  fetch(settings.url, {
    ...settings.fetch,
    ...options,
    body: JSON.stringify({
      query,
      variables,
      operationName
    })
  })
    .then(res => {
      if (res.ok) return res.json();
      else return Promise.reject(res);
    })
    .then(res => res.data);
