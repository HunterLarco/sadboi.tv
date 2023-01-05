<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useGridStore } from '@/store/grid';

const gridStore = useGridStore();
const { page: gridPage } = storeToRefs(gridStore);
</script>

<template>
  <div class="Dock">
    <div class="Left">
      <div class="Icon" v-if="gridPage != 'Chat'" @click="gridPage = 'Chat'">
        <img src="@/assets/images/grid/dock/ChatIcon.svg" />
      </div>
      <div class="HiddenIcon" v-else />

      <div
        class="Icon"
        v-if="gridPage != 'Settings'"
        @click="gridPage = 'Settings'"
      >
        <img src="@/assets/images/grid/dock/SettingsIcon.svg" />
      </div>
      <div class="HiddenIcon" v-else />
    </div>

    <div class="Right">
      <div class="Icon" v-if="gridPage != 'Info'" @click="gridPage = 'Info'">
        <img src="@/assets/images/grid/dock/InfoIcon.svg" />
      </div>
      <div class="HiddenIcon" v-else />
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
