import type { PrismaClient, User } from '@prisma/client';
import { UserHandleColor } from '@prisma/client';
import DataLoader from 'dataloader';
import { GraphQLError } from 'graphql';
import pickRandom from 'pick-random';

export default class UserDataSource {
  #prismaClient: PrismaClient;

  constructor(args: { prismaClient: PrismaClient }) {
    const { prismaClient } = args;
    this.#prismaClient = prismaClient;
  }

  async createAnonymousUser(): Promise<User> {
    const name = `sadboi_${Math.random()}`;
    const availableColors = [
      UserHandleColor.Green,
      UserHandleColor.Turquoise,
      UserHandleColor.Lavender,
      UserHandleColor.Violet,
      UserHandleColor.Pink,
      UserHandleColor.Red,
      UserHandleColor.Orange,
      UserHandleColor.Yellow,
    ];
    const selectedColor = pickRandom(availableColors)[0];

    return await this.#prismaClient.user.create({
      data: {
        handle: {
          name,
          selectedColor,
          availableColors,
          selectedBadges: [],
          availableBadges: [],
        },
      },
    });
  }

  async getByIdOrThrow(id: string): Promise<User> {
    const user = await this.getById(id);
    if (!user) {
      throw new GraphQLError(`User ${id} not found.`, {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return user;
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.#batchGetById.load(id);
    return user || null;
  }

  #batchGetById = new DataLoader(async (ids: Readonly<Array<string>>) => {
    const users = await this.#prismaClient.user.findMany({
      where: {
        OR: ids.map((id) => ({ id })),
      },
    });

    // We need to ensure that the returned users are in the same exact order as
    // the searched id's to fulfill the DataLoader contract:

    const userMap = new Map<string, User>();
    for (const user of users) {
      userMap.set(user.id, user);
    }

    return ids.map((id) => (userMap.has(id) ? userMap.get(id) : null));
  });
}
