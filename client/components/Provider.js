'use client'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphqlThree',
});


const Provider = ({children}) => {

    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
        onError: ({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
              console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            });
          }
          if (networkError) {
            console.error(`[Network error]: ${networkError}`);
          }
        },
      
      });

  return (
    <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
  )
}

export default Provider