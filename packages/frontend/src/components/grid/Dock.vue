<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import ChatIcon from '@/assets/images/grid/dock/ChatIcon.svg';
import InfoIcon from '@/assets/images/grid/dock/InfoIcon.svg';
import SettingsIcon from '@/assets/images/grid/dock/SettingsIcon.svg';
import { useGridStore } from '@/store/grid';
import type { GridPage } from '@/store/grid';

const gridStore = useGridStore();
const { page: gridPage } = storeToRefs(gridStore);

type IconDefinition = {
  page: GridPage;
  image: string;
};

const leftIcons = ref<Array<IconDefinition>>([
  {
    page: 'Chat',
    image: ChatIcon,
  },
  {
    page: 'Settings',
    image: SettingsIcon,
  },
]);

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
          v-if="gridPage != icon.page"
          @click="gridPage = icon.page"
        >
          <img :src="icon.image" />
        </div>
        <div class="HiddenIcon" v-else />
      </template>
    </div>

    <div class="Right">
      <template v-for="icon of rightIcons" :key="icon.page">
        <div
          class="Icon"
          v-if="gridPage != icon.page"
          @click="gridPage = icon.page"
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

    background-image: url('@/assets/images/GridOutline.svg');
    background-position: 25px 25px;
    background-repeat: repeat;
    content: '';
    display: block;
    mix-blend-mode: overlay;
    z-index: -1;
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
    background: #fff;
    bottom: 1px;
    content: '';
    display: block;
    left: 1px;
    mix-blend-mode: overlay;
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
</style>
