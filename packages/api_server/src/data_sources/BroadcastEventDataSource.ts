import type {
  BroadcastEvent,
  PrismaClient,
  User,
  UserHandle,
} from '@prisma/client';

export default class BroadcastEventDataSource {
  #prismaClient: PrismaClient;

  constructor(args: { prismaClient: PrismaClient }) {
    const { prismaClient } = args;
    this.#prismaClient = prismaClient;
  }

  async createChatMessageEvent(args: {
    actor: User;
    text: string;
  }): Promise<BroadcastEvent> {
    const { actor, text } = args;

    return await this.#prismaClient.broadcastEvent.create({
      data: {
        details: {
          chatMessage: {
            authorId: actor.id,
            preservedHandle: actor.handle,
            payload: {
              text: {
                value: text,
              },
            },
          },
        },
      },
    });
  }

  async createUserEnterChatEvent(args: {
    actor: User;
  }): Promise<BroadcastEvent> {
    const { actor } = args;

    return await this.#prismaClient.broadcastEvent.create({
      data: {
        details: {
          userEnterChat: {
            userId: actor.id,
            preservedHandle: actor.handle,
          },
        },
      },
    });
  }

  async createUserHandleChangeEvent(args: {
    userId: string;
    before: UserHandle;
    after: UserHandle;
  }): Promise<BroadcastEvent> {
    const { userId, before, after } = args;

    return await this.#prismaClient.broadcastEvent.create({
      data: {
        details: {
          userHandleChange: {
            userId,
            before,
            after,
          },
        },
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
