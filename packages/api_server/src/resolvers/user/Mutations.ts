import type { MutationResolvers } from '@generated/graphql/user_service/resolvers';
import { UserHandleColor as GraphQLUserHandleColor } from '@generated/graphql/user_service/resolvers';
import { UserHandleColor } from '@prisma/client';
import deepEqual from 'fast-deep-equal';
import { GraphQLError } from 'graphql';

export const resolvers: MutationResolvers = {
  async createUser(_0, { request }, { dataSources }) {
    const formattedName = request.handle.name.trim();
    validateHandleName(formattedName);

    const user = await dataSources.User.createAnonymousUser({
      handle: {
        name: formattedName,
        color: toPrismaColor(request.handle.color),
      },
    });

    const authToken = await dataSources.AuthToken.createUserAuthToken(user.id);

    return {
      user,
      authToken: authToken.id,
    };
  },

  async setUserHandle(_0, { request }, { dataSources, actor }) {
    if (!actor) {
      throw new GraphQLError(
        'setUserHandle endpoint requires a logged in user.',
        { extensions: { code: 'UNAUTHORIZED' } }
      );
    }

    /// Validate the name.

    const formattedName =
      request.name != null ? request.name.trim() : undefined;
    if (formattedName != null) {
      validateHandleName(formattedName);
    }

    /// Validate the color.

    const prismaColor =
      request.color != null ? toPrismaColor(request.color) : undefined;
    if (prismaColor) {
      if (
        actor.handle.availableColors.filter((c) => c == prismaColor).length == 0
      ) {
        throw new GraphQLError(
          `User ${actor.id} is not permitted to use color ${request.color}.`,
          { extensions: { code: 'INVALID_ARGUMENT' } }
        );
      }
    }

    /// Update the handle.

    const updatedUser = await dataSources.User.updateUserHandle({
      id: actor.id,
      name: formattedName,
      color: prismaColor,
    });

    /// Publish this change to the broadcast pubsub.

    if (!deepEqual(updatedUser.handle, actor.handle)) {
      const broadcastEvent =
        await dataSources.BroadcastEvent.createUserHandleChangeEvent({
          userId: updatedUser.id,
          before: actor.handle,
          after: updatedUser.handle,
        });

      dataSources.BroadcastEventPubSub.publish(broadcastEvent);
    }

    return updatedUser;
  },
};

function validateHandleName(name: string) {
  if (name.length < 5) {
    throw new GraphQLError('User names must be at least 5 characters.', {
      extensions: { code: 'INVALID_ARGUMENT' },
    });
  } else if (name.match(/[^a-zA-Z0-9_]/)) {
    throw new GraphQLError(
      `'${name.replace(/[a-zA-Z0-9_]/g, '')}' are disallowed characters.`,
      { extensions: { code: 'INVALID_ARGUMENT' } }
    );
  }
}

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
