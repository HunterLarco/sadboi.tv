import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
  split,
} from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { provideApolloClient } from '@vue/apollo-composable';
import { createClient } from 'graphql-ws';

import BroadcastEventFieldPolicy from '@/apollo/cache_policies/BroadcastEvent';

/// Create link

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.PROD
      ? `ws://api.sadboi.tv/graphql`
      : `ws://${window.location.hostname}:4000/graphql`,
    // Unbelievably, web sockers cannot include custom headers in browsers (see
    // linked source below). This means that we need to send our authorization
    // token directly as part of the initial connection request instead of using
    // the `authorization` ApolloLink which is used with `httpLink`.
    //
    // https://stackoverflow.com/questions/4361173/http-headers-in-websockets-client-api/4361358#4361358
    connectionParams: () => ({
      Authorization: localStorage.getItem('authorization') ?? undefined,
    }),
  })
);

const httpLink = new HttpLink({
  uri: import.meta.env.PROD
    ? `https://api.sadboi.tv/graphql`
    : `http://${window.location.hostname}:4000/graphql`,
});

const authorization = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('authorization');
  if (token) {
    operation.setContext({
      headers: {
        Authorization: token,
      },
    });
  }
  return forward(operation);
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  concat(authorization, httpLink)
);

/// Create cache

const cache = new InMemoryCache({
  typePolicies: {
    BroadcastEvent: {
      fields: {
        ...BroadcastEventFieldPolicy,
      },
    },
  },
});

/// Construct the client

const apolloClient = new ApolloClient({
  cache,
  link,
});

provideApolloClient(apolloClient);
