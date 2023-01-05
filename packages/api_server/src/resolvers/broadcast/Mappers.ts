import {
  Resolvers,
  ResolversParentTypes,
} from '@generated/graphql/broadcast_service/resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: Resolvers = {
  BroadcastEvent: {
    id(parent) {
      return parent.id;
    },
    details(parent) {
      for (const [key, value] of Object.entries(parent.details)) {
        if (value) {
          return value;
        }
      }
      throw new GraphQLError(`BroadcastEventDetails had no fields set.`, {
        extensions: { code: 'BAD_STATE' },
      });
    },
    timestamp(parent) {
      return parent.timestamp;
    },
  },

  BroadcastEventDetails: {
    __resolveType(parent) {
      // Unfortunately, because Prisma doesn't support Unions and therefore
      // doesn't add any information to the model types to support union
      // discrimination, we need to manually look for unique fields that
      // identify each type.
      if ('authorId' in parent) {
        return 'ChatMessageEvent';
      } else {
        return 'UserHandleChangeEvent';
      }
    },
  },

  ChatMessageEvent: {
    author(parent, _1, { dataSources }) {
      return dataSources.User.getByIdOrThrow(parent.authorId);
    },
    preservedHandle(parent) {
      return parent.preservedHandle;
    },
    payload(parent) {
      for (const [key, value] of Object.entries(parent.payload)) {
        if (value) {
          return value;
        }
      }
      throw new GraphQLError(`ChatMessagePayload had no fields set.`, {
        extensions: { code: 'BAD_STATE' },
      });
    },
  },

  ChatMessagePayload: {
    __resolveType(parent) {
      // Unfortunately, because Prisma doesn't support Unions and therefore
      // doesn't add any information to the model types to support union
      // discrimination, we need to manually look for unique fields that
      // identify each type.
      if ('text' in parent) {
        return 'ChatMessageTextPayload';
      } else {
        return 'ChatMessageShakaPayload';
      }
    },
  },

  ChatMessageTextPayload: {
    text(parent) {
      return parent.text;
    },
  },

  ChatMessageShakaPayload: {
    enteringChat(parent) {
      return parent.enteringChat;
    },
  },

  UserHandleChangeEvent: {
    before(parent) {
      return parent.before;
    },
    after(parent) {
      return parent.after;
    },
  },
};
