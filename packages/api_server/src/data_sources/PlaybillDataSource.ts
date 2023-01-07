import type { Playbill, Prisma, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { GraphQLError } from 'graphql';

export default class PlaybillDataSource {
  #prismaClient: PrismaClient;

  constructor(args: { prismaClient: PrismaClient }) {
    const { prismaClient } = args;
    this.#prismaClient = prismaClient;
  }

  async createPlaybill(
    playbill: Prisma.PlaybillCreateInput
  ): Promise<Playbill> {
    return await this.#prismaClient.playbill.create({
      data: playbill,
    });
  }

  async getByIdOrThrow(id: string): Promise<Playbill> {
    const playbill = await this.getById(id);
    if (!playbill) {
      throw new GraphQLError(`Playbill ${id} not found.`, {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return playbill;
  }

  async getById(id: string): Promise<Playbill | null> {
    const playbill = await this.#batchGetById.load(id);
    return playbill || null;
  }

  #batchGetById = new DataLoader(async (ids: Readonly<Array<string>>) => {
    const playbills = await this.#prismaClient.playbill.findMany({
      where: {
        OR: ids.map((id) => ({ id })),
      },
    });

    // We need to ensure that the returned playbills are in the same exact order
    // as the searched id's to fulfill the DataLoader contract:

    const playbillMap = new Map<string, Playbill>();
    for (const playbill of playbills) {
      playbillMap.set(playbill.id, playbill);
    }

    return ids.map((id) => (playbillMap.has(id) ? playbillMap.get(id) : null));
  });
}
