import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client/core";
import { ErrorLink } from '@apollo/client/link/error';
import { useAuthStore } from '@/stores/useAuthStore/useAuthStore.ts'
import { AppRouters, RoutePaths, router } from '@/shared/config/router'

const uri = import.meta.env.VITE_API_URL;
const httpLink = new HttpLink({ uri, credentials: "include" });

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
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
});


