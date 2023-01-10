import MuxClient from '@mux/mux-node';
import { PrismaClient } from '@prisma/client';

export type GlobalContext = {
  prisma: PrismaClient;
  mux: MuxClient;
};

export async function createGlobalContext(): Promise<GlobalContext> {
  const prisma = new PrismaClient();
  await prisma.$connect();

  return {
    prisma,
    mux: new MuxClient(),
  };
}
