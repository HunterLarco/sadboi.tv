<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import ChatIcon from '@/assets/images/grid/dock/ChatIcon.svg';
import InfoIcon from '@/assets/images/grid/dock/InfoIcon.svg';
import SettingsIcon from '@/assets/images/grid/dock/SettingsIcon.svg';
import { useBroadcastStore } from '@/store/broadcast';
import { useGridStore } from '@/store/grid';
import type { GridPage } from '@/store/grid';

const broadcastStore = useBroadcastStore();
const gridStore = useGridStore();

/// Watch for unread events (populates the chat icon badge).

const unreadEvents = ref(0);
watch(
  () => broadcastStore.events,
  (after, before) => {
    if (gridStore.page != 'Chat') {
      // If new events are streamed, but the chat is not open, increase the
      // unread events count.
      unreadEvents.value += after.length - before.length;
    }
  }
);
watch(
  () => gridStore.page,
  (page) => {
    if (page == 'Chat') {
      // When the chat is opened, set the unread events count to zero.
      unreadEvents.value = 0;
    }
  }
);

/// Define Icons

type IconDefinition = {
  page: GridPage;
  image: string;
  badge?: number;
};

const leftIcons = computed(
  (): Array<IconDefinition> => [
    {
      page: 'Chat',
      image: ChatIcon,
      badge: unreadEvents.value > 0 ? unreadEvents.value : undefined,
    },
    {
      page: 'Settings',
      image: SettingsIcon,
    },
  ]
);

const rightIcons = ref<Array<IconDefinition>>([
  {
    page: 'Info',
    image: InfoIcon,
  },
]);
</script>

<template>
  <div class="Dock">
    <div class="Left">
      <template v-for="icon of leftIcons" :key="icon.page">
        <div
          class="Icon"
          v-if="gridStore.page != icon.page"
          @click="gridStore.page = icon.page"
        >
          <div class="Badge" v-if="icon.badge !== undefined" />
          <img :src="icon.image" />
        </div>
        <div class="HiddenIcon" v-else />
      </template>
    </div>

    <div class="Right">
      <template v-for="icon of rightIcons" :key="icon.page">
        <div
          class="Icon"
          v-if="gridStore.page != icon.page"
          @click="gridStore.page = icon.page"
        >
          <img :src="icon.image" />
        </div>
        <div class="HiddenIcon" v-else />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';

.Dock {
  @include layout-horizontal;

  height: 50px;
  padding: 1px;
  position: relative;

  &::before {
    @include layout-fill;

    background: var(--grid-dock-background);
    content: '';
    display: block;
    mix-blend-mode: var(--grid-icon-blend-mode);
  }
}

.Left {
  @include layout-horizontal;

  flex-grow: 1;
}

.Right {
  @include layout-horizontal;

  flex-shrink: 0;
}

.Icon {
  cursor: pointer;
  flex-shrink: 0;
  height: 48px;
  padding: 1px;
  position: relative;
  width: 48px;

  img {
    height: 100%;
    width: 100%;
  }

  &:hover::before {
    background: var(--grid-icon-background);
    bottom: 1px;
    content: '';
    display: block;
    left: 1px;
    mix-blend-mode: var(--grid-icon-blend-mode);
    position: absolute;
    right: 1px;
    top: 1px;
    z-index: -1;
  }
}

.HiddenIcon {
  width: 48px;
  height: 48px;
}

.Badge {
  background: #d80000;
  border-radius: 50%;
  height: 6px;
  position: absolute;
  right: 6px;
  top: 6px;
  width: 6px;
}
</style>
