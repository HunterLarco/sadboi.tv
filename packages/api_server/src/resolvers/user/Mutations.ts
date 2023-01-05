import type { MutationResolvers } from '@generated/graphql/user_service/resolvers';
import { UserHandleColor as GraphQLUserHandleColor } from '@generated/graphql/user_service/resolvers';
import { UserHandleColor } from '@prisma/client';
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

  async setUserHandleColor(_0, { color }, { dataSources, actor }) {
    if (!actor) {
      throw new GraphQLError(
        'setUserHandleColor endpoint requires a logged in user.',
        { extensions: { code: 'UNAUTHORIZED' } }
      );
    }

    const prismaColor = toPrismaColor(color);
    if (
      actor.handle.availableColors.filter((c) => c == prismaColor).length == 0
    ) {
      throw new GraphQLError(
        `User ${actor.id} is not permitted to use color ${color}.`,
        { extensions: { code: 'INVALID_ARGUMENT' } }
      );
    }

    await dataSources.User.updateUserHandle({
      id: actor.id,
      color: prismaColor,
    });
  },

  async setUserHandleName(_0, { name }, { dataSources, actor }) {
    if (!actor) {
      throw new GraphQLError(
        'setUserHandleName endpoint requires a logged in user.',
        { extensions: { code: 'UNAUTHORIZED' } }
      );
    }

    if (name.length < 5) {
      throw new GraphQLError('User names must be at least 5 characters.', {
        extensions: { code: 'INVALID_ARGUMENT' },
      });
    }

    await dataSources.User.updateUserHandle({ id: actor.id, name });
  },
};

function toPrismaColor(color: GraphQLUserHandleColor): UserHandleColor {
  switch (color) {
    case GraphQLUserHandleColor.Unknown:
      return UserHandleColor.Unknown;
    case GraphQLUserHandleColor.Green:
      return UserHandleColor.Green;
    case GraphQLUserHandleColor.Turquoise:
      return UserHandleColor.Turquoise;
    case GraphQLUserHandleColor.Lavender:
      return UserHandleColor.Lavender;
    case GraphQLUserHandleColor.Violet:
      return UserHandleColor.Violet;
    case GraphQLUserHandleColor.Pink:
      return UserHandleColor.Pink;
    case GraphQLUserHandleColor.Red:
      return UserHandleColor.Red;
    case GraphQLUserHandleColor.Orange:
      return UserHandleColor.Orange;
    case GraphQLUserHandleColor.Yellow:
      return UserHandleColor.Yellow;
    case GraphQLUserHandleColor.SadBot:
      return UserHandleColor.SadBot;
  }
}
