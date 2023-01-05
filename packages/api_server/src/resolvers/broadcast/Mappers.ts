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
      return parent.details;
    },
    timestamp(parent) {
      return parent.timestamp;
    },
  },

  BroadcastEventDetails: {
    chatMessage(parent) {
      return parent.chatMessage;
    },
    userHandleChange(parent) {
      return parent.userHandleChange;
    },
    userEnterChat(parent) {
      return parent.userEnterChat;
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
      return parent.payload;
    },
  },

  ChatMessagePayload: {
    text(parent) {
      return parent.text;
    },
  },

  ChatMessageTextPayload: {
    value(parent) {
      return parent.value;
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

  UserEnterChatEvent: {
    user(parent, _1, { dataSources }) {
      return dataSources.User.getByIdOrThrow(parent.userId);
    },
    preservedHandle(parent) {
      return parent.preservedHandle;
    },
  },
};
