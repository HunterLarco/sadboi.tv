import type { Resolvers } from '@generated/graphql/playbill_service/resolvers';

export const resolvers: Resolvers = {
  Playbill: {
    id(parent) {
      return parent.id;
    },
    startDate(parent) {
      return parent.startDate;
    },
    acts(parent) {
      return [];
    },
  },
};
