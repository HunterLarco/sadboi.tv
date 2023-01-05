import { ResolversTypes } from '@generated/graphql/room_service/resolvers';
import { PubSub } from 'graphql-subscriptions';

type WaitingRoomEvent = ResolversTypes['WaitingRoomEvent'];

const inMemoryPubSub = new PubSub();

/**
 * In-memory pubsub mechanism for game events.
 */
export default class WaitingRoomPubSub {
  publish(event: WaitingRoomEvent) {
    inMemoryPubSub.publish('global', { event });
  }

  async *subscribe(): AsyncIterableIterator<WaitingRoomEvent> {
    // @ts-expect-error TS2504
    for await (const { event } of inMemoryPubSub.asyncIterator('global')) {
      yield event;
    }
  }
}
