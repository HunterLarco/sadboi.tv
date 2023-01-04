import type { PrismaClient } from '@prisma/client';

export default class GlobalAtomicCounters {
  #prismaClient: PrismaClient;

  constructor(args: { prismaClient: PrismaClient }) {
    const { prismaClient } = args;
    this.#prismaClient = prismaClient;
  }

  /**
   * Increments the named counter by the amount and returns the new value.
   */
  async incrementCounter(name: string, amount: number = 1): Promise<number> {
    const { count } = await this.#prismaClient.counters.upsert({
      where: {
        name,
      },
      update: {
        count: { increment: amount },
      },
      create: {
        name,
        count: amount,
      },
    });

    return count;
  }
}
