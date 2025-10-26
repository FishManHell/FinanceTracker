import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client/core";
import { ErrorLink } from '@apollo/client/link/error';
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { AppRouters, RoutePaths, router } from '@/shared/config/router/router.ts'

const uri = import.meta.env.VITE_API_URL;
const httpLink = new HttpLink({ uri });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const errorLink = new ErrorLink(({ result }) => {
  const authStore = useAuthStore();

  if (result?.errors) {
    for (const err of result.errors) {
      if (err.extensions?.code === 'UNAUTHORIZED') {
        authStore.logout();
        router.push(RoutePaths[AppRouters.SIGN_IN]);
        break;
      }
    }
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});


