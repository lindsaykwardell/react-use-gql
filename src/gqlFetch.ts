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
        const body = await res.json();
        if (body.errors) return Promise.reject({ res, body });
        return body;
      }
      const body = await res.json();

      return Promise.reject({...res, body});
    })
    .then(res => res.data);
