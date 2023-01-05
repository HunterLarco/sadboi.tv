import type {
  MutationResolvers,
  SendChatMessagePayload,
} from '@generated/graphql/broadcast_service/resolvers';
import type { BroadcastEvent } from '@prisma/client';
import { GraphQLError } from 'graphql';

import type { RequestContext } from '@/RequestContext';

export const resolvers: MutationResolvers = {
  async sendChatMessage(_0, { request }, requestContext) {
    const { dataSources } = requestContext;

    const broadcastEvent = await createChatMessage({
      requestContext,
      payload: request.payload,
    });

    dataSources.BroadcastEventPubSub.publish(broadcastEvent);

    return {
      event: broadcastEvent,
    };
  },
};

async function createChatMessage(args: {
  requestContext: RequestContext;
  payload: SendChatMessagePayload;
}): Promise<BroadcastEvent> {
  const { requestContext, payload } = args;
  const { dataSources, actor } = requestContext;

  if (!actor) {
    throw new GraphQLError(
      'sendChatMessage endpoint requires a logged in user.',
      { extensions: { code: 'UNAUTHORIZED' } }
    );
  }

  if (payload.text) {
    return await dataSources.BroadcastEvent.createTextChatMessageEvent({
      actor,
      text: payload.text.text,
    });
  } else if (payload.shaka) {
    return await dataSources.BroadcastEvent.createShakaChatMessageEvent({
      actor,
      enteringChat: payload.shaka.enteringChat,
    });
  }

  throw new GraphQLError('Unknown chat message payload.', {
    extensions: { code: 'INVALID_ARGUMENT' },
  });
}
