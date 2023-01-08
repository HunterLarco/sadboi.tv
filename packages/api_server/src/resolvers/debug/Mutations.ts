import { DebugMutationsResolvers } from '@generated/graphql/debug_service/resolvers';

import { createAndBroadcastShow } from '@/util/playbill/cron';

export const resolvers: DebugMutationsResolvers = {
  async startShow(_0, { delay }, { globalContext }) {
    await createAndBroadcastShow({
      startDate: new Date(Date.now() + delay * 1000),
      globalContext,
    });
  },
};
