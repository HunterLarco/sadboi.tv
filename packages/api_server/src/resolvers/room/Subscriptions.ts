import type { SubscriptionResolvers } from '@generated/graphql/room_service/resolvers';
import {
  ViewingRoomEventType,
  WaitingRoomEventType,
} from '@generated/graphql/room_service/resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: SubscriptionResolvers = {
  waitingRoom: {
    async *subscribe(_0, _1, { dataSources }) {
      yield {
        waitingRoom: {
          type: WaitingRoomEventType.Ready,
          timestamp: new Date(),
        },
      };

      for await (const event of dataSources.WaitingRoomPubSub.subscribe()) {
        yield { waitingRoom: event };
      }
    },
  },

  viewingRoom: {
    async *subscribe(_0, { id }, { dataSources }) {
      yield {
        viewingRoom: {
          type: ViewingRoomEventType.Ready,
          timestamp: new Date(),
        },
      };

      for await (const event of dataSources.ViewingRoomPubSub.subscribe(id)) {
        yield { viewingRoom: event };
      }
    },
  },
};
