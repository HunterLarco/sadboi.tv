import type { SubscriptionResolvers } from '@generated/graphql/broadcast_service/resolvers';

export const resolvers: SubscriptionResolvers = {
  broadcast: {
    async *subscribe(_0, _1, { dataSources }) {
      for await (const event of dataSources.BroadcastPubSub.subscribe()) {
        yield { broadcast: event };
      }
    },
  },
};
