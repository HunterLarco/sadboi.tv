import type { MutationResolvers } from '@generated/graphql/broadcast_service/resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: MutationResolvers = {
  async sendChatMessage(_0, { request }, { dataSources, actor }) {
    if (!actor) {
      throw new GraphQLError(
        'sendChatMessage endpoint requires a logged in user.',
        { extensions: { code: 'UNAUTHORIZED' } }
      );
    }

    const broadcastEvent =
      await dataSources.BroadcastEvent.createChatMessageEvent({
        actor,
        payload: request.payload,
      });

    dataSources.BroadcastEventPubSub.publish(broadcastEvent);

    return {
      event: broadcastEvent,
    };
  },
};
