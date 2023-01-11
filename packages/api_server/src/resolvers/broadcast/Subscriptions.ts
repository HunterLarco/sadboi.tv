import type { SubscriptionResolvers } from '@generated/graphql/broadcast_service/resolvers';
import { Asset as MuxAsset } from '@mux/mux-node';
import type { Playbill } from '@prisma/client';
import { GraphQLError } from 'graphql';

import type { RequestContext } from '@/RequestContext';

export const resolvers: SubscriptionResolvers = {
  broadcast: {
    async *subscribe(_0, _1, requestContext) {
      const { dataSources } = requestContext;

      const activePlaybill = await getActivePlaybill(requestContext);

      yield {
        broadcast: {
          state: {
            // TODO: fetch the most recent playbill and evaluate if it's active.
            active: activePlaybill
              ? {
                  playbill: activePlaybill,
                }
              : null,
            next: {
              // TODO: actually compute this.
              startDate: new Date(),
            },
          },
        },
      };

      for await (const event of dataSources.BroadcastPubSub.subscribe()) {
        yield { broadcast: event };
      }
    },
  },
};

async function getActivePlaybill(
  requestContext: RequestContext
): Promise<Playbill | null> {
  const { dataSources } = requestContext;

  const latestPlaybill = await dataSources.Playbill.getLatest();
  if (!latestPlaybill) {
    return null;
  }

  // Measured in seconds.
  const durations: Array<number> = await Promise.all(
    latestPlaybill.acts.map(async (act) => {
      if (act.media.playback.video) {
        const assetId = act.media.playback.video.muxAssetId;
        return assetDuration(await dataSources.Mux.getAsset(assetId));
      } else if (act.media.playback.audio) {
        const assetId = act.media.playback.audio.muxAssetId;
        return assetDuration(await dataSources.Mux.getAsset(assetId));
      }

      throw new GraphQLError(
        `Playbill ${latestPlaybill.id} has unknown playback type.`,
        { extensions: { code: 'INTERNAL' } }
      );
    })
  );

  // Measured in seconds.
  const totalDuration: number = durations.reduce((a, b) => a + b, 0);

  const endDate = new Date(
    latestPlaybill.startDate.getTime() + totalDuration * 1000
  );
  if (endDate.getTime() < Date.now()) {
    return null;
  }

  return latestPlaybill;
}

function assetDuration(asset: MuxAsset): number {
  if (asset.duration === undefined) {
    throw new GraphQLError(`Asset ${asset.id} has no duration.`, {
      extensions: { code: 'INTERNAL' },
    });
  }
  return asset.duration;
}
