import type { QueryResolvers } from '@generated/graphql/broadcast_service/resolvers';

export const resolvers: QueryResolvers = {
  async broadcastEventHistory(_0, { request }, { dataSources }) {
    const kPageSize = 101;

    const history = await dataSources.BroadcastEvent.getHistory({
      startFrom: request.cursor ?? undefined,
      pageSize: kPageSize,
    });

    return {
      events: history.slice(0, -1),
      nextPageCursor:
        history.length == kPageSize ? history[kPageSize - 1].id : null,
    };
  },
};
