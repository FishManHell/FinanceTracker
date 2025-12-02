import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client/core";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { ErrorLink } from '@apollo/client/link/error';
import { useAuthStore } from '@/stores/useAuthStore/useAuthStore.ts'
import { AppRouters, RoutePaths, router } from '@/shared/config/router'

const uri = import.meta.env.VITE_API_URL;
const uploadHttpLink = new UploadHttpLink({
  uri,
  credentials: "include",
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
  link: ApolloLink.from([errorLink, uploadHttpLink]),
  cache: new InMemoryCache(),
});


