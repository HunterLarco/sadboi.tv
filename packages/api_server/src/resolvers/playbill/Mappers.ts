import type { Resolvers } from '@generated/graphql/playbill_service/resolvers';
import {
  ActType,
  OutlinkType,
} from '@generated/graphql/playbill_service/resolvers';
import type { Asset as MuxAsset } from '@mux/mux-node';
import { GraphQLError } from 'graphql';

export const resolvers: Resolvers = {
  Playbill: {
    id(parent) {
      return parent.id;
    },
    startDate(parent) {
      return parent.startDate;
    },
    acts(parent) {
      return parent.acts;
    },
  },

  Act: {
    type(parent) {
      return parent.type;
    },
    media(parent) {
      return parent.media;
    },
    whyWeChoseThis(parent) {
      return parent.whyWeChoseThis;
    },
  },

  ActType: {
    Content: ActType.Content,
    Bump: ActType.Bump,
  },

  Media: {
    title(parent) {
      return parent.title;
    },
    credits(parent) {
      return parent.credits;
    },
    outlinks(parent) {
      return parent.outlinks;
    },
    playback(parent) {
      return parent.playback;
    },
  },

  MediaCredit: {
    role(parent) {
      return parent.role;
    },
    creator(parent) {
      return parent.creator;
    },
  },

  MediaPlayback: {
    async video(parent, _1, { globalContext: { mux } }) {
      if (!parent.video) {
        return null;
      }
      const asset = await mux.Video.Assets.get(parent.video.muxAssetId);
      return {
        muxPlaybackId: muxPlaybackId(asset),
        duration: assetDuration(asset),
      };
    },
    async audio(parent, _1, { globalContext: { mux } }) {
      if (!parent.audio) {
        return null;
      }
      const asset = await mux.Video.Assets.get(parent.audio.muxAssetId);
      return {
        muxPlaybackId: muxPlaybackId(asset),
        duration: assetDuration(asset),
      };
    },
  },

  Creator: {
    name(parent) {
      return parent.name;
    },
    outlinks(parent) {
      return parent.outlinks;
    },
  },

  Outlink: {
    type(parent) {
      switch (new URL(parent.uri).hostname) {
        case 'vimeo.com':
          return OutlinkType.Vimeo;
        case 'youtube.com':
          return OutlinkType.YouTube;
        case 'soundcloud.com':
          return OutlinkType.SoundCloud;
        case 'bandcamp.com':
          return OutlinkType.Bandcamp;
        default:
          return OutlinkType.Unknown;
      }
    },
    uri(parent) {
      return parent.uri;
    },
  },
};

function assetDuration(asset: MuxAsset): number {
  if (asset.duration === undefined) {
    throw new GraphQLError(`Asset ${asset.id} has no duration.`, {
      extensions: { code: 'INTERNAL' },
    });
  }
  return asset.duration;
}

function muxPlaybackId(asset: MuxAsset): string {
  const playbackIds = asset.playback_ids ?? [];
  const maybePlaybackId = playbackIds.find(({ policy }) => policy == 'public');
  if (!maybePlaybackId) {
    throw new GraphQLError(`Asset ${asset.id} has no public playback ID.`, {
      extensions: { code: 'INTERNAL' },
    });
  }
  return maybePlaybackId.id;
}
