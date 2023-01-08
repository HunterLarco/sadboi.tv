import { ResolversTypes } from '@generated/graphql/broadcast_service/resolvers';
import { PubSub } from 'graphql-subscriptions';

type BroadcastEvent = ResolversTypes['BroadcastEvent'];
type BroadcastSubscription = ResolversTypes['BroadcastSubscription'];

const inMemoryPubSub = new PubSub();

/**
 * In-memory pubsub mechanism for game events.
 */
export default class BroadcastPubSub {
  publish(event: BroadcastEvent) {
    inMemoryPubSub.publish('Global', { event });
  }

  async *subscribe(): AsyncIterableIterator<BroadcastSubscription> {
    // @ts-expect-error TS2504
    for await (const event of inMemoryPubSub.asyncIterator('Global')) {
      yield event;
    }
  }
}
