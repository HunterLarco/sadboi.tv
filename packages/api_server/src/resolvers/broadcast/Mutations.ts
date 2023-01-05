import type {
  MutationResolvers,
  SendChatMessagePayload,
} from '@generated/graphql/broadcast_service/resolvers';
import type { BroadcastEvent } from '@prisma/client';
import { GraphQLError } from 'graphql';

import type { RequestContext } from '@/RequestContext';

export const resolvers: MutationResolvers = {
  async sendChatMessage(_0, { request }, { dataSources, actor }) {
    if (!actor) {
      throw new GraphQLError(
        'sendChatMessage endpoint requires a logged in user.',
        { extensions: { code: 'UNAUTHORIZED' } }
      );
    } else if (!request.payload.text) {
      throw new GraphQLError('Exactly one payload type must be defined.', {
        extensions: { code: 'INVALID_ARGUMENT' },
      });
    }

    const broadcastEvent =
      await dataSources.BroadcastEvent.createChatMessageEvent({
        actor,
        text: request.payload.text.value,
      });

    dataSources.BroadcastEventPubSub.publish(broadcastEvent);

    return {
      event: broadcastEvent,
    };
  },

  async enterChat(_0, _1, { dataSources, actor }) {
    if (!actor) {
      throw new GraphQLError('enterChat endpoint requires a logged in user.', {
        extensions: { code: 'UNAUTHORIZED' },
      });
    }

    const broadcastEvent =
      await dataSources.BroadcastEvent.createUserEnterChatEvent({
        actor,
      });

    dataSources.BroadcastEventPubSub.publish(broadcastEvent);

    return {
      event: broadcastEvent,
    };
  },
};
