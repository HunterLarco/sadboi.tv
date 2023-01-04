import type { QueryResolvers } from '@generated/graphql/user_service/resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: QueryResolvers = {
  async viewer(_0, _1, { actor }) {
    return actor;
  },

  async userById(_0, { id }, { dataSources }) {
    return dataSources.User.getById(id);
  },
};
