# react-use-gql

### **React Hooks library to allow GraphQL Query, Mutation, and Subscription**

<a id="/features"></a>&nbsp;

- Two hooks:
  - useGQL
  - useSub
- Stores query or mutation response as state
- Queries and mutations can be re-queried at any time
- Method to run query or mutation also available: gqlFetch()
  - This uses the ES6 fetch() function
- Subscriptions automatically close when the component is destroyed

<a id="/usage"></a>&nbsp;

## Usage

```javascript
// ES6
import { settings, gqlFetch, useGQL, useSub } from "react-use-gql";

settings: {
    url: string;
    subUrl: string;
    options: {
        [key: string]: string;
    };
    fetch: {
        method: string;
        headers: {
            [key: string]: string;
        };
    };
}

gqlFetch: <T>(
    query: string,
    variables?: {
      [key: string]: string;
    },
    operationName?: string,
    options?: {
      [key: string]: string;
    }) => Promise<T>

useGQL: <T>(
    query: string,
    wait?: boolean,
    variables?: {
      [key: string]: string;
    },
    operationName?: string,
    options?: {
      [key: string]: string;
    }) => [result: T, call: () => void, loading: boolean, error: Response]

useSub: <T>(
    query: string,
    variables?: {
      [key: string]: string;
    },
    operationName?: string
    ) => T

```

### Settings

`url: string`

The URL of the GraphQL endpoint

`subUrl: string`

The URL of the GraphQL subscription endpoint

`options: { [key: string]: string; };`

Options to be passed into the subscription web socket.

`fetch.method: string`

The HTTP method to use for querying. Defaults to POST.

`fetch.headers: { [key: string]: string; };`

The HTTP headers to use on queries. Defaults to:

```
headers: { "Content-Type": "application/json" }
```

### Query options

`query: string`

The GraphQL query. Examples:

Query:

```
{
  users {
    name
  }
}
```

Mutation:

```
mutation: {
  createUser (
    name: "Lindsay"
  ) {
    name
  }
}
```

Subscription:

```
{
  subscription: {
    newUser {
      name
    }
  }
}
```

`wait?: boolean`

_(useGQL only)_ Tells the hook whether to run the query immediately on load, or wait for a manual call.

`variables?: { [key: string]: string; }`

Any variables required by the GraphQL query.

`operationName?: string`

The operation name for the query (not required)

`options?: { [key: string]: string; }`

Any options to pass into the fetch() request.

<a id="/example"></a>&nbsp;

## Example

Basic example using `create-react-app`:

```
import React, { useState, useEffect } from "react";
import "./App.css";
import { settings, useSub, useGQL } from "./lib/index";

settings.url = "http://localhost:4000";
settings.subUrl = "ws://localhost:4000";

function App() {
  const data = useSub<{ count: number }>(`subscription {count}`);
  const [query, setQuery] = useState(`{
    users {
      name
    }
  }`);
  const [results, call, loading, error] = useGQL<{
    users: { name: string; age: number }[];
  }>(query, true);

  return (
    <div>
      <button onClick={() => call()}>Click me to run the query</button>
      <button
        onClick={() =>
          setQuery(`{
            users {
              age
            }
          }`)
        }
      >Click me to change the query!</button>
      Current count: {data && data.count}
      <div>
        {loading 
          ? <span>Loading...</span> 
          : error 
          ? <span>{error.statusText}</span> 
          : results &&
          results.users.map(user => (
            <div>
              Hello, {user.name ? user.name : `you are ${user.age} years old`}!
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
```

<a id="/license"></a>&nbsp;

## License

This project is MIT Licensed.
