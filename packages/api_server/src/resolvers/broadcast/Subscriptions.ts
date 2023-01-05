import type { SubscriptionResolvers } from '@generated/graphql/broadcast_service/resolvers';

export const resolvers: SubscriptionResolvers = {
  broadcastEvent: {
    async *subscribe(_0, _1, { dataSources }) {
      for await (const event of dataSources.BroadcastEventPubSub.subscribe()) {
        yield { broadcastEvent: event };
      }
    },
  },
};
