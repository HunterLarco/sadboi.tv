import type { Resolvers } from '@generated/graphql/user_service/resolvers';
import {
  UserBadge,
  UserHandleColor,
} from '@generated/graphql/user_service/resolvers';

export const resolvers: Resolvers = {
  User: {
    id(parent) {
      return parent.id;
    },
    handle(parent) {
      return parent.handle;
    },
    dateCreated(parent) {
      return parent.dateCreated;
    },
    isViewer(parent, _1, { actor }) {
      return parent.id == actor?.id;
    },
  },

  Viewer: {
    id(parent) {
      return parent.id;
    },
    handle(parent) {
      return parent.handle;
    },
    handleSettings(parent) {
      return {
        availableColors: parent.handle.availableColors,
        availableBadges: parent.handle.availableBadges,
      };
    },
    dateCreated(parent) {
      return parent.dateCreated;
    },
  },

  UserHandle: {
    name(parent) {
      return parent.name;
    },
    color(parent) {
      return parent.selectedColor;
    },
    badges(parent) {
      return parent.selectedBadges;
    },
  },

  UserHandleColor: {
    Unknown: UserHandleColor.Unknown,
    Green: UserHandleColor.Green,
    Turquoise: UserHandleColor.Turquoise,
    Lavender: UserHandleColor.Lavender,
    Violet: UserHandleColor.Violet,
    Pink: UserHandleColor.Pink,
    Red: UserHandleColor.Red,
    Orange: UserHandleColor.Orange,
    Yellow: UserHandleColor.Yellow,
    SadBot: UserHandleColor.SadBot,
  },

  UserBadge: {
    Unknown: UserBadge.Unknown,
    SadBot: UserBadge.SadBot,
  },
};
