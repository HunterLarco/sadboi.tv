import { ResolversTypes } from '@generated/graphql/broadcast_service/resolvers';
import { PubSub } from 'graphql-subscriptions';

type BroadcastEvent = ResolversTypes['BroadcastEvent'];

const inMemoryPubSub = new PubSub();

/**
 * In-memory pubsub mechanism for game events.
 */
export default class BroadcastEventPubSub {
  publish(event: BroadcastEvent) {
    inMemoryPubSub.publish('Global', { event });
  }

  async *subscribe(): AsyncIterableIterator<BroadcastEvent> {
    // @ts-expect-error TS2504
    for await (const { event } of inMemoryPubSub.asyncIterator('Global')) {
      yield event;
    }
  }
}
