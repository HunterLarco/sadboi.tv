<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useGridStore } from '@/store/grid';

const gridStore = useGridStore();
const { page: gridPage } = storeToRefs(gridStore);
</script>

<template>
  <div class="TitleBar">
    <div class="Title">About sadboi</div>
    <div class="Icon" @click="gridPage = null">
      <img src="@/assets/images/grid/dock/InfoIcon.svg" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.TitleBar {
  @include layout-horizontal;

  height: 48px;
}

.Title {
  @include fonts-body;
  @include layout-vertical-center;

  background: #1e1d1e;
  color: #d3b7ff;
  flex-grow: 1;
  overflow: hidden;
  padding: 0 24px;
  text-overflow: ellipsis;
}

.Icon {
  cursor: pointer;
  flex-shrink: 0;
  width: 50px;
  height: 48px;
  padding: 2px 2px 0 2px;
  position: relative;

  &::before {
    @include layout-fill;

    background: #fff;
    content: '';
    display: block;
    mix-blend-mode: overlay;
    z-index: -1;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
