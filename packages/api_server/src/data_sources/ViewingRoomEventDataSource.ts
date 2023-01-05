import type { PrismaClient, User, ViewingRoomEvent } from '@prisma/client';
import { ViewingRoomEventType } from '@prisma/client';

export default class ViewingRoomEventDataSource {
  #prismaClient: PrismaClient;

  constructor(args: { prismaClient: PrismaClient }) {
    const { prismaClient } = args;
    this.#prismaClient = prismaClient;
  }

  async createChatMessageEvent(args: {
    room: string;
    actor: User;
    payload: string;
  }): Promise<ViewingRoomEvent> {
    const { room, actor, payload } = args;

    return await this.#prismaClient.viewingRoomEvent.create({
      data: {
        room,
        type: ViewingRoomEventType.ChatMessage,
        details: {
          chatMessage: {
            authorId: actor.id,
            preservedHandle: {
              name: actor.handle.name,
              color: actor.handle.selectedColor,
              badges: actor.handle.selectedBadges,
            },
            payload: {
              text: payload,
            },
          },
        },
        timestamp: new Date(),
      },
    });
  }

  /**
   * Queries for event history in a room chronologically.
   *
   * The support pagination, the field `startFrom` can be supplied a
   * ViewingRoomEvent ID to limit the response to events *starting from* that
   * ID.
   */
  async getEventHistory(args: {
    room: string;
    startFrom?: string;
    pageSize?: number;
  }): Promise<Array<ViewingRoomEvent>> {
    const { room, startFrom, pageSize } = args;

    return await this.#prismaClient.viewingRoomEvent.findMany({
      where: {
        room,
      },
      take: pageSize ?? 100, // 100 is the default pageSize
      cursor: startFrom
        ? {
            id: startFrom,
          }
        : undefined,
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
}
