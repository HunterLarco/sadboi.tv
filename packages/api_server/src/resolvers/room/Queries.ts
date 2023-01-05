import type { QueryResolvers } from '@generated/graphql/room_service/resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: QueryResolvers = {
  viewingRoomHistory(_0, { id }, { dataSources }) {
    throw new GraphQLError('Method Unimplemented', {
      extensions: { code: 'UNIMPLEMENTED' },
    });
  },
};
