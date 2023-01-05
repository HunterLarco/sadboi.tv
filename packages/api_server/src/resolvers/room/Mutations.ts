import type {
  MutationResolvers,
  ResolversTypes,
} from '@generated/graphql/room_service/resolvers';
import {
  ViewingRoomEventType,
  WaitingRoomEventType,
} from '@generated/graphql/room_service/resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: MutationResolvers = {
  async sendChatMessage(_0, { request }, { dataSources, actor }) {
    if (!actor) {
      throw new GraphQLError(
        'sendChatMessage endpoint requires a logged in user.',
        { extensions: { code: 'UNAUTHORIZED' } }
      );
    }

    // TODO: persist history

    const chatMessage: ResolversTypes['ChatMessage'] = {
      __typename: 'ChatMessage',
      author: actor,
      preservedHandle: actor.handle,
      payload: request.payload,
    };

    if (request.room) {
      await dataSources.ViewingRoomEvent.createChatMessageEvent({
        room: request.room,
        actor,
        payload: request.payload,
      });
      dataSources.ViewingRoomPubSub.publish(request.room, {
        type: ViewingRoomEventType.ChatMessage,
        timestamp: new Date(),
        details: chatMessage,
      });
    } else {
      dataSources.WaitingRoomPubSub.publish({
        type: WaitingRoomEventType.ChatMessage,
        timestamp: new Date(),
        details: chatMessage,
      });
    }

    return {
      message: chatMessage,
    };
  },
};
