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
    .then(async res => {
      if (res.ok) {
        const parsed = await res.json();
        if (parsed.errors) return Promise.reject(res);
        return parsed;
      }
      return Promise.reject(res);
    })
    .then(res => res.data);
