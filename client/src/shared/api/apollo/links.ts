import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename'
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { ErrorLink } from '@apollo/client/link/error'
import { AppRouters, RoutePaths, router } from '@/shared/config/router'
import { sessionStore } from '@/entities/auth'
import { userStore } from "@/entities/user"

const uri = import.meta.env.VITE_API_URL;

export const uploadHttpLink = new UploadHttpLink({
  uri,
  credentials: "include",
});

export const removeTypenameLink = new RemoveTypenameFromVariablesLink();

export const errorLink = new ErrorLink(({ result }) => {
  const session_store = sessionStore();
  const user_store = userStore();

  if (result?.errors) {
    for (const err of result.errors) {
      if (err.extensions?.code === "UNAUTHORIZED") {
        session_store.logout();
        user_store.clearUser();
        router.push(RoutePaths[AppRouters.SIGN_IN]);
        break;
      }
    }
  }
});
