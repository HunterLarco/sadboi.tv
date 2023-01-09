import type { Resolvers } from '@generated/graphql/playbill_service/resolvers';
import {
  ActType,
  OutlinkType,
} from '@generated/graphql/playbill_service/resolvers';

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
    video(parent) {
      return parent.video;
    },
    audio(parent) {
      return parent.audio;
    },
  },

  VideoPlayback: {
    muxPlaybackId(parent) {
      return parent.muxPlaybackId;
    },
  },

  AudioPlayback: {
    muxPlaybackId(parent) {
      return parent.muxPlaybackId;
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
