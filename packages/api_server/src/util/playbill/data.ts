import type { Playbill } from '@prisma/client';

export function createCurrentPlaybill(startDate: Date): Omit<Playbill, 'id'> {
  return {
    startDate,
    acts: [],
  };
}
