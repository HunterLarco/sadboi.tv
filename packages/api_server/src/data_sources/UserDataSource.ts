import type { Prisma, PrismaClient, User } from '@prisma/client';
import { UserHandleColor } from '@prisma/client';
import DataLoader from 'dataloader';
import { GraphQLError } from 'graphql';

import GlobalAtomicCounters from '@/data_sources/GlobalAtomicCounters';
import { psuedoRandomId } from '@/util/math/psuedo_random_id';

export default class UserDataSource {
  #prismaClient: PrismaClient;
  #counters: GlobalAtomicCounters;

  constructor(args: { prismaClient: PrismaClient }) {
    const { prismaClient } = args;
    this.#prismaClient = prismaClient;
    this.#counters = new GlobalAtomicCounters({ prismaClient });
  }

  async createAnonymousUser(args: {
    handle: {
      name: string;
      color: UserHandleColor;
    };
  }): Promise<User> {
    const {
      handle: { name, color },
    } = args;

    const totalUsers = await this.#counters.incrementCounter('TotalUsers');
    const id = psuedoRandomId({ seed: totalUsers, minBound: 100000 });
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

    // Quick sanity check that the requested color is available to a new user.
    if (availableColors.filter((c) => c == color).length == 0) {
      throw new GraphQLError(
        `New users are not permitted to use color ${color}.`,
        { extensions: { code: 'INVALID_ARGUMENT' } }
      );
    }

    return await this.#prismaClient.user.create({
      data: {
        id: id.toString(),
        handle: {
          name,
          selectedColor: color,
          availableColors,
          selectedBadges: [],
          availableBadges: [],
        },
      },
    });
  }

  async updateUserHandle(args: {
    id: string;
    name?: string;
    color?: UserHandleColor;
  }): Promise<User> {
    const { id, name, color } = args;

    const where: Prisma.UserWhereUniqueInput = { id };
    if (color) {
      where.handle = {
        is: {
          availableColors: {
            has: color,
          },
        },
      };
    }

    const update: Prisma.UserHandleUpdateInput = {};
    if (name) {
      update.name = name;
    }
    if (color) {
      update.selectedColor = color;
    }

    return await this.#prismaClient.user.update({
      where,
      data: {
        handle: {
          update,
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
