import { ResolversTypes } from '@generated/graphql/broadcast_service/resolvers';
import { PubSub } from 'graphql-subscriptions';

type BroadcastEvent = ResolversTypes['BroadcastEvent'];
type BroadcastState = ResolversTypes['BroadcastState'];
type BroadcastSubscription = ResolversTypes['BroadcastSubscription'];

const inMemoryPubSub = new PubSub();

/**
 * In-memory pubsub mechanism for game events.
 */
export default class BroadcastPubSub {
  async publish(event: BroadcastEvent) {
    const broadcast: BroadcastSubscription = { event: await event };
    inMemoryPubSub.publish('Global', broadcast);
  }

  async publishState(state: BroadcastState) {
    const broadcast: BroadcastSubscription = { state: await state };
    inMemoryPubSub.publish('Global', broadcast);
  }

  async *subscribe(): AsyncIterableIterator<BroadcastSubscription> {
    // @ts-expect-error TS2504
    for await (const broadcast of inMemoryPubSub.asyncIterator('Global')) {
      yield broadcast;
    }
  }
}
