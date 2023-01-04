import type { QueryResolvers } from '@generated/graphql/user_service/resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: QueryResolvers = {
  async viewer(_0, _1, { dataSources }) {
    throw new GraphQLError('Method not implemented.', {
      extensions: { code: 'UNIMPLEMENTED' },
    });
  },

  async userById(_0, id, { dataSources }) {
    throw new GraphQLError('Method not implemented.', {
      extensions: { code: 'UNIMPLEMENTED' },
    });
  },
};
