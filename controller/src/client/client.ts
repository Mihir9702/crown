import { Client, cacheExchange, fetchExchange } from "urql";

export default new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: "include" as const,
});
