import type { SubscriptionResolvers } from '@generated/graphql/broadcast_service/resolvers';

export const resolvers: SubscriptionResolvers = {
  broadcast: {
    async *subscribe(_0, _1, { dataSources }) {
      yield {
        broadcast: {
          state: {
            // TODO: fetch the most recent playbill and evaluate if it's active.
            active: null,
            next: {
              // TODO: actually compute this.
              startDate: new Date(),
            },
          },
        },
      };

      for await (const event of dataSources.BroadcastPubSub.subscribe()) {
        yield { broadcast: event };
      }
    },
  },
};
