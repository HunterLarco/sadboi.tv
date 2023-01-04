import type { MutationResolvers } from '@generated/graphql/user_service/resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: MutationResolvers = {
  async createUser(_0, _1, { dataSources }) {
    const user = await dataSources.User.createAnonymousUser();
    const authToken = await dataSources.AuthToken.createUserAuthToken(user.id);
    return {
      user,
      deviceToken: authToken.id,
    };
  },

  async setUserHandleColor(_0, _1, { dataSources }) {
    throw new GraphQLError('Method not implemented.', {
      extensions: { code: 'UNIMPLEMENTED' },
    });
  },

  async setUserHandleName(_0, _1, { dataSources }) {
    throw new GraphQLError('Method not implemented.', {
      extensions: { code: 'UNIMPLEMENTED' },
    });
  },
};
