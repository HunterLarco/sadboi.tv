import type { BroadcastEvent, PrismaClient, User } from '@prisma/client';

export default class BroadcastEventDataSource {
  #prismaClient: PrismaClient;

  constructor(args: { prismaClient: PrismaClient }) {
    const { prismaClient } = args;
    this.#prismaClient = prismaClient;
  }

  async createChatMessageEvent(args: {
    actor: User;
    payload: string;
  }): Promise<BroadcastEvent> {
    const { actor, payload } = args;

    return await this.#prismaClient.broadcastEvent.create({
      data: {
        details: {
          chatMessage: {
            authorId: actor.id,
            preservedHandle: actor.handle,
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
   * Queries for event history chronologically.
   *
   * The support pagination, the field `startFrom` can be supplied a
   * BroadcastEvent ID to limit the response to events *starting from* that
   * ID.
   */
  async getHistory(args: {
    startFrom?: string;
    pageSize?: number;
  }): Promise<Array<BroadcastEvent>> {
    const { startFrom, pageSize } = args;

    return await this.#prismaClient.broadcastEvent.findMany({
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
