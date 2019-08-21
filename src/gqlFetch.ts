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
        console.log(res.body);
        const body = await res.json();
        if (body.errors) return Promise.reject({ res, body });
        return body;
      }
      return Promise.reject({ res, body: await res.json() });
    })
    .then(res => res.data);
