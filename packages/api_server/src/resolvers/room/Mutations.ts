import type {
  MutationResolvers,
  ResolversTypes,
} from '@generated/graphql/room_service/resolvers';
import { WaitingRoomEventType } from '@generated/graphql/room_service/resolvers';
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
      author: actor,
      preservedHandle: actor.handle,
      payload: request.payload,
    };

    dataSources.WaitingRoomPubSub.publish({
      type: WaitingRoomEventType.ChatMessage,
      timestamp: new Date(),
      details: chatMessage,
    });

    return {
      message: chatMessage,
    };
  },
};
