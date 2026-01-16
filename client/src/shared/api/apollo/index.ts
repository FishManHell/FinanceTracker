import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client/core'
import { removeTypenameLink, errorLink, uploadHttpLink } from './links.ts'

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([removeTypenameLink, errorLink, uploadHttpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
})
