import { ResolversTypes } from '@generated/graphql/room_service/resolvers';
import { PubSub } from 'graphql-subscriptions';

type ViewingRoomEvent = ResolversTypes['ViewingRoomEvent'];

const inMemoryPubSub = new PubSub();

/**
 * In-memory pubsub mechanism for game events.
 */
export default class ViewingRoomPubSub {
  publish(room: string, event: ViewingRoomEvent) {
    inMemoryPubSub.publish(room, { event });
  }

  async *subscribe(room: string): AsyncIterableIterator<ViewingRoomEvent> {
    // @ts-expect-error TS2504
    for await (const { event } of inMemoryPubSub.asyncIterator(room)) {
      yield event;
    }
  }
}
