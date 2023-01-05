import type { QueryResolvers } from '@generated/graphql/broadcast_service/resolvers';

export const resolvers: QueryResolvers = {
  async broadcastEventHistory(_0, { request }, { dataSources }) {
    const kPageSize = 100;

    const history = await dataSources.BroadcastEvent.getHistory({
      startFrom: request.cursor ?? undefined,
      pageSize: kPageSize + 1,
    });

    return {
      events: history.slice(0, kPageSize),
      nextPageCursor: history.length > kPageSize ? history[kPageSize].id : null,
    };
  },
};
