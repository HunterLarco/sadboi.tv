import type { QueryResolvers } from '@generated/graphql/room_service/resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: QueryResolvers = {
  async viewingRoomHistory(_0, { request }, { dataSources }) {
    const history = await dataSources.ViewingRoomEvent.getEventHistory({
      room: request.room,
      startFrom: request.cursor ?? undefined,
    });

    console.log(history);

    throw new GraphQLError('Method Unimplemented', {
      extensions: { code: 'UNIMPLEMENTED' },
    });
  },
};
