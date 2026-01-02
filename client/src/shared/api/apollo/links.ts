import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename'
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { ErrorLink } from '@apollo/client/link/error'
import { onLogout } from '@/entities/auth'

const uri = import.meta.env.VITE_API_URL;

export const uploadHttpLink = new UploadHttpLink({
  uri,
  credentials: "include",
});

export const removeTypenameLink = new RemoveTypenameFromVariablesLink();

export const errorLink = new ErrorLink(({ result }) => {

  if (result?.errors) {
    for (const err of result.errors) {
      if (err.extensions?.code === "UNAUTHORIZED") {
        console.log(err.extensions?.code, 'err.extensions?.code');
        onLogout()
        break;
      }
    }
  }
});
