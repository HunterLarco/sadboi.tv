<script setup lang="ts">
import { useGridStore } from '@/store/grid';
import { useUserStore } from '@/store/user';

const gridStore = useGridStore();
const userStore = useUserStore();

/// Actions

async function logout() {
  await userStore.logout();
  gridStore.resetEnteredState();
}
</script>

<template>
  <div class="TitleBar">
    <div class="LogoutButton" @click="logout">
      <img src="@/assets/images/grid/settings/LogoutIcon.svg" />
    </div>
    <div class="PageIcon" @click="gridStore.page = null">
      <img src="@/assets/images/grid/dock/SettingsIcon.svg" />
    </div>
    <div class="Title">Settings</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.TitleBar {
  @include layout-horizontal;

  height: 48px;
}

.LogoutButton {
  background: #000;
  cursor: pointer;
  flex-shrink: 0;
  height: 48px;
  padding: 2px 0 0 2px;
  width: 48px;

  img {
    height: 100%;
    width: 100%;
  }
}

.PageIcon {
  cursor: pointer;
  flex-shrink: 0;
  height: 48px;
  padding: 2px 2px 0 2px;
  position: relative;
  width: 50px;

  &::before {
    @include layout-fill;

    background: #fff;
    content: '';
    display: block;
    mix-blend-mode: overlay;
    z-index: -1;
  }

  img {
    height: 100%;
    width: 100%;
  }
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
</style>
