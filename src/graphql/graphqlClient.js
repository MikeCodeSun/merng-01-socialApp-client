import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://social-app-0-1.herokuapp.com/",
});

const authLink = setContext(() => {
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Post: {
        fields: {
          likes: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          comments: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
